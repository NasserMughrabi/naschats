import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import db from "../../../../firebaseConfig";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import runMiddleware from "../../../lib/runMiddleware";

// eslint-disable-next-line new-cap
const cors = Cors({
  methods: ["GET", "DELETE"]
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { method } = req;
  const { uId } = req.query;
  // This is the field of the document in the chat_histories collection
  type Message = {
    id?: string; // used in api/chat, this is the document id
    text: string; // text content of the message
    uId: string | null;
    timestamp: number;
    isUser: boolean; // true if the message is from the user, false if from the bot
    canRefresh: boolean; // true if the message can be refreshed
    promptMode: string; // use cases from the menu
  };

  switch (method) {
    // get all messages from the user
    case "GET":
      try {
        const chatHistoryRef = collection(db, "chat_histories");
        const chatHistoryQuery = query(chatHistoryRef, where("uId", "==", uId));
        const chatHistorySnapshot = await getDocs(chatHistoryQuery);

        const chatHistory: Message[] = [];

        chatHistorySnapshot.forEach((doc) => {
          const message = doc.data();
          chatHistory.push({
            id: doc.id,
            text: message.text,
            uId: message.uId,
            timestamp: message.timestamp,
            isUser: message.isUser,
            canRefresh: message.canRefresh,
            promptMode: message.promptMode
          });
        });

        res.status(200).json(chatHistory);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    // delete the most recent message from the chatbot
    case "DELETE":
      try {
        const chatHistoryRef = collection(db, "chat_histories");
        const chatHistoryQuery = query(chatHistoryRef, where("uId", "==", uId));
        const chatHistorySnapshot = await getDocs(chatHistoryQuery);

        const chatHistory: Message[] = [];

        chatHistorySnapshot.forEach((doc) => {
          const message = doc.data();
          chatHistory.push({
            id: doc.id,
            text: message.text,
            uId: message.uId,
            timestamp: message.timestamp,
            isUser: message.isUser,
            canRefresh: message.canRefresh,
            promptMode: message.promptMode
          });
        });

        const mostRecentMessageFromChatbot = chatHistory
          .filter((message) => !message.isUser)
          .sort((a, b) => b.timestamp - a.timestamp)[0];

        const lastMessageId = mostRecentMessageFromChatbot.id as string;

        const lastMessageRef = doc(db, "chat_histories", lastMessageId);
        await deleteDoc(lastMessageRef);

        res.status(200).json({ message: "Message deleted successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
