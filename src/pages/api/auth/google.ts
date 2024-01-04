import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { AuthService } from "../../../lib/firebase/AuthService";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import db from "../../../../firebaseConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  var user = req.body;
  var user = user.user
  const fullName = user.displayName;
  const [firstName, lastName] = splitNameByFirstSpace(fullName);

  try {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      created_at: Timestamp.now().toMillis(),
    });

    res.setHeader(
      "set-cookie",
      `uid=${user.uid}; Max-Age=${1000 * 60 * 24 * 14};Path=/; HttpOnly`
    );
    return res.status(200).json({ uid: user.uid });
  } catch (e) {
    console.log("now", e)
    return res.status(500).json({ error: "error setDoc in the firestore" });
  }
}

function splitNameByFirstSpace(fullName: string): [string, string] {
  const firstSpaceIndex = fullName.indexOf(' ');
  if (firstSpaceIndex !== -1) {
    const firstName = fullName.slice(0, firstSpaceIndex);
    const lastName = fullName.slice(firstSpaceIndex + 1);
    return [firstName, lastName];
  } else {
    // If there's no space, assume the whole string is the first name
    return [fullName, ''];
  }
}
