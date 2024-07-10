export const typeDefs = `#graphql

scalar DateTime  

directive @auth on FIELD_DEFINITION 

type Game {
  id: ID!,
  title: String!,
  platform: [String]!,
  releaseDate: DateTime!,
  reviews: [Review!]
}

type Review {
  id: ID!,
  rating: Int!,
  content: String!,
  author: Author!,
  game: Game!,
  createdAt: DateTime!
}

type Author {
  id: ID!,
  name: String!,
  email: String!,
  verified: Boolean!,
  reviews: [Review!]
}

type Query {
  games(page: Int, pageSize: Int): [Game],    
  game(id: ID!): Game,
  reviews: [Review],
  author(id: ID!): Author @auth               
}

type Mutation {
  addGame(game: AddGameInput!): Game,
  deleteGame(id: ID!): [Game] @auth,          
  updateGame(id: ID!, edits: EditGameInput!): Game
  login(name: String!, password: String!): AuthPayload!
}

input AddGameInput {
  title: String!,
  platform: [String!]!,
  releaseDate: DateTime!
}

input EditGameInput {
  title: String,
  platform: [String!],
  releaseDate: DateTime
}

type Subscription {
  gameAdded: Game!  
}

type AuthPayload {
  token: String!
  user: Author!
}


`;
