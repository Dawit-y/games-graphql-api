import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PubSub } from 'graphql-subscriptions';
import { typeDefs } from "./schema.js";
import { resolvers, context } from "./resolvers.js";

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => ({ ...context, pubsub }) 
});

const { url } = startStandaloneServer(server, {
  listen: { port: 4000 },
  context,
});

console.log(`Server ready at: ${url}`);
