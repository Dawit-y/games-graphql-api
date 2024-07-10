import { GraphQLScalarType, Kind } from "graphql";
import jwt from "jsonwebtoken";
import db from "./_db.js";

const SECRET = "supersecret";

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toString();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    games: (_, { page = 1, pageSize = 2 }) => {
      const startIndex = (page - 1) * pageSize;
      return db.games.slice(startIndex, startIndex + pageSize);
    },
    game: (_, { id }) => db.games.find((game) => game.id === id),
    reviews: () => db.reviews,
    author: (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      return db.authors.find((author) => author.id === id);
    },
  },

  Mutation: {
    addGame: (_, { game }) => {
      const newGame = {
        ...game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(newGame);
      pubsub.publish("GAME_ADDED", { gameAdded: newGame });
      return newGame;
    },
    deleteGame: (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      db.games = db.games.filter((game) => game.id !== id);
      return db.games;
    },
    updateGame: (_, { id, edits }) => {
      const game = db.games.find((game) => game.id === id);
      return { ...game, ...edits };
    },
    login: async (parent, { name, password }, context) => {
      const user = db.authors.find(
        (user) => user.name === name && user.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign({ userId: user.id }, SECRET);
      return {
        token,
        user,
      };
    },
  },

  Subscription: {
    gameAdded: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("GAME_ADDED"),
    },
  },

  Game: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.game_id === parent.id),
  },

  Review: {
    author: (parent) =>
      db.authors.find((author) => author.id === parent.author_id),
    game: (parent) => db.games.find((game) => game.id === parent.game_id),
  },

  Author: {
    reviews: (parent) =>
      db.reviews.filter((review) => review.author_id === parent.id),
  },
};

const context = ({ req }) => {
  const token = req.headers.authorization || "";
  if (token) {
    try {
      const user = jwt.verify(token, SECRET);
      return { user };
    } catch (e) {
      throw new Error("Invalid token");
    }
  }
  return {};
};

export { resolvers, context };
