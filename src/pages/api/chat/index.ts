import {
  addDoc,
  deleteDoc,
  collection,
  Timestamp,
  query,
  getDocs,
  where
} from "firebase/firestore";
import db from "../../../../firebaseConfig";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import runMiddleware from "../../../lib/runMiddleware";

// eslint-disable-next-line new-cap
const cors = Cors({
  methods: ["POST", "DELETE"]
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const { method, body } = req;
  const { text, uId, isUser, canRefresh, promptMode } = body;

  switch (method) {
    // save the message to the database
    case "POST":
      try {
        await addDoc(collection(db, "chat_histories"), {
          text,
          uId,
          isUser,
          timestamp: Timestamp.now().toMillis(),
          canRefresh,
          promptMode
        });
        res.status(200).json({ message: "Message sent successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    // delete all messages with the given uId
    case "DELETE":
      try {
        const chatHistoryRef = collection(db, "chat_histories");
        const chatHistoryQuery = query(chatHistoryRef, where("uId", "==", uId));
        const chatHistorySnapshot = await getDocs(chatHistoryQuery);

        chatHistorySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });

        res.status(200).json({ message: "Chat history deleted successfully" });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
