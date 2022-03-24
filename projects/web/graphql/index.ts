import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${process.env.server_api_url!}/graphql`,
  cache: new InMemoryCache()
})