import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const URL = "https://ion-movies.herokuapp.com";

const cache = new InMemoryCache();

const link = createHttpLink({ uri: URL });

const clientConfig = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
});

export default clientConfig;
