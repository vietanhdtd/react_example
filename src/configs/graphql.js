import { ApolloClient } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { cache } from "./cache";

const URL = "https://ion-movies.herokuapp.com";

const link = createHttpLink({ uri: URL });

const clientConfig = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

export default clientConfig;
