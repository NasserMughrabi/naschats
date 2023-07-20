import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { AuthService } from "../../../lib/firebase/AuthService";
// import { getUserData } from "../user/[uId]";

// signup api
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body;

    const { loginWithEmailAndPassword } = AuthService;

    // 1. login user with email and password
    // const { user, error } = await loginWithEmailAndPassword(email, password);
    try {
        const userCredential = await loginWithEmailAndPassword(email, password);
        // console.log(userCredential.user);

        if (!userCredential.user) {
            // console.log("======= check the user property==========");
            // console.log(userCredential.user);
            // console.log("==== check the user.uid ======");
            return res.status(401).json({
                error: "[Firebase Authentication] : userCredential exist but does not have user property "
            });
        }
        const uid = userCredential.user.uid;
        res.setHeader(
            "set-cookie",
            `uid=${uid}; Max-Age=${1000 * 60 * 24 * 14};Path=/; HttpOnly`
        );

        return res.status(200).json({ uid: userCredential.user.uid });
    } catch (e) {
        // console.log(e);
        return res
            .status(500)
            .json({ error: "[NextJs] : Backend API Login Failed" });
    }
}
