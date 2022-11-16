import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../comps/home/Login";
import Seo from "../comps/layout/SEO";
import useLoggedIn from "../utils/useLoggedIn";
import useUser from "../utils/useUser";

export default function Home() {
  const isLoggedIn = useLoggedIn();
  const router = useRouter();
  const data = useUser();
  useEffect(() => {
    if (data?.me) {
      router.push("/posts/" + data.me.email);
    }
  }, [data]);
  return (
    <div>
      <Seo title="Start your survey" />
      <main className="h-screen">{isLoggedIn ? "Loading..." : <Login />}</main>
    </div>
  );
}
