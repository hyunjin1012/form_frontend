import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let token = "";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      token: token,
    },
  };
});

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
