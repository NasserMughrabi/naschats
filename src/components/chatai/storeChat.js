// Store chat history to firestore
export default async function storeChat(
  text,
  uid,
  timestamp,
  isUser,
  canRefresh,
  promptMode
) {
  await fetch(`/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      uId: uid,
      timestamp: timestamp,
      isUser: isUser,
      canRefresh: canRefresh,
      promptMode: promptMode,
    }),
  });
}
