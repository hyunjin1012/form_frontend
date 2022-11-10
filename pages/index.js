import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { isLoggedInVar } from "../apollo";
import Forms from "../comps/home/Forms";
import Login from "../comps/home/Login";
import Seo from "../comps/layout/SEO";

export default function Home() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      <Seo title="Start your survey" />
      <main className="h-screen">{isLoggedIn ? <Forms /> : <Login />}</main>
    </div>
  );
}
