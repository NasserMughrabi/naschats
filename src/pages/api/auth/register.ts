import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { AuthService } from "../../../lib/firebase/AuthService";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import db from "../../../../firebaseConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const check = JSON.parse(req.body);
    // console.log(`DEBUG: in the register API:${req.body}`);
    // console.log(`DEBUG: in the register API:${check}`)
  } catch (e) {
    return res.status(400).json({
      error: "bad request since formData in undefined",
      body: req.body
    });
  }

  const { createUserWithEmailAndPassword } = AuthService;
  const formData = JSON.parse(req.body);


  // Register user with email and password using firebase auth
  const userCredential = await createUserWithEmailAndPassword(
    formData.email,
    formData.password
  );
  const user = userCredential.user;

  if (!user || !user.uid) {
    return res.status(500).json({ error: "firebase create user failed" });
  }

  try {
    console.log(formData.firstName)
    await setDoc(doc(db, "users", user.uid), {
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      created_at: Timestamp.now().toMillis(),
    });

    // console.log('Setting cookies')
    res.setHeader(
      "set-cookie",
      `uid=${user.uid}; Max-Age=${1000 * 60 * 24 * 14};Path=/; HttpOnly`
    );

    return res.status(200).json({ uid: user.uid });
  } catch (e) {
    return res.status(500).json({ error: "error setDoc in the firestore" });
  }
}
