import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLoggedIn from "./useLoggedIn";

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      name
    }
  }
`;

export default function useUser() {
  const hasToken = useLoggedIn();
  const router = useRouter();
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      router.push("/");
    }
  };
  const { data } = useQuery(ME_QUERY, { skip: !hasToken });
  useEffect(() => {
    if (data?.me === null) {
      logOut();
    }
  }, [data]);
  return data;
}
