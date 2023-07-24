import { useRouter } from "next/dist/client/router";
import { useAuth } from "./auth";
import { useEffect } from "react";
// import fetcher from "../../lib/fetcher";

// The function is going to prevent nologing user to check pages
// outer: just a function
// inner: functional component
export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (auth.status === "pending") return;
      if (!auth.uid) {
        router.replace(
          {
            pathname: "/login",
            query: { from: encodeURIComponent(router.asPath) }
          },
          "/login"
        );
      }
    }, [auth.uid, auth.status, router]);

    if (auth.status === "pending") return null;

    if (!auth.uid) return <h1>Redirect Into Login Page</h1>;

    return <Component auth={auth} {...props} />;
  };
}

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (auth.status === "pending") return;

      if (auth.uid) {
        router.replace(
          {
            pathname: "/chat"
          },
          "/chat"
        );
      }
    }, [auth.uid, auth.status, router]);

    if (auth.status === "pending") return null;

    if (auth.uid) return <h1>Redirecting to Dashboard</h1>;

    return <Component auth={auth} {...props} />;
  };
}

// export function withAdmin(Component) {
//   return function WithAdmin(props) {
//     const auth = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//       if (auth.status === "pending") return;

//       // no user is signed in!
//       if (!auth.uid) {
//         router.replace(
//           {
//             pathname: "/404",
//             query: { from: encodeURIComponent(router.asPath) }
//           },
//           "/404"
//         );
//       }

//       // If a user is logged in! check that is authorized
//       if (auth.uid) {
//         fetcher(`/api/user/${auth.uid}`).then((data) => {
//           if (data.userData) {
//             if (data.userData.status !== "admin") {
//               router.replace(
//                 {
//                   pathname: "/404",
//                   query: { from: encodeURIComponent(router.asPath) }
//                 },
//                 "/404"
//               );
//             }
//           } else {
//             console.log("error fetching data!!!");
//           }
//         });
//       }
//     }, [auth.uid, auth.status, router]);

//     if (auth.status === "pending") return null;

//     if (!auth.uid) return <h1>Redirect Into 404 page! (Page is not found!)</h1>;

//     return <Component auth={auth} {...props} />;
//   };
// }
