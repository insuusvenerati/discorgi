const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getUser: AuthUser
    userServers: [Server]
    server(serverId: ID!): Server
    getMessages(
      pageSize: Int
      after: String
      channelId: ID!
    ): MessageConnection!
  }

  type Subscription {
    serverDeleted(serverId: ID!): Server
    channelSub(serverId: ID!): ChannelSubscription!
    userSub(serverId: ID!): UserSubscription!
    messageAdded(channelId: ID!): Message
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserCreateInput!): AuthPayload!

    createServer(data: CreateServerInput): Server
    deleteServer(serverId: ID!): Server
    joinServer(serverId: ID!): Server
    leaveServer(serverId: ID!): Server

    createChannel(data: CreateChannelInput!): Channel
    updateChannel(data: UpdateChannelInput!): Channel
    deleteChannel(data: DeleteChannelInput!): Channel

    createMessage(data: CreateMessageInput!): Message
  }

  type MessageConnection {
    cursor: String
    hasMore: Boolean!
    messages: [Message]!
  }

  type ChannelSubscription {
    mutation: String!
    data: Channel!
  }

  type UserSubscription {
    mutation: String!
    data: User!
    serverId: ID!
  }

  type AuthUser {
    id: ID!
    name: String!
  }

  input CreateServerInput {
    serverName: String!
    icon: String
  }

  input CreateMessageInput {
    msg: String!
    channelId: ID!
    serverId: ID!
  }

  input UserCreateInput {
    name: String!
    password: String!
  }

  input UpdateChannelInput {
    channelId: ID!
    serverId: ID!
    name: String!
  }

  input CreateChannelInput {
    name: String!
    serverId: ID!
  }

  input DeleteChannelInput {
    channelId: ID
    serverId: ID!
  }

  type AuthPayload {
    token: String!
  }

  type Channel {
    id: ID!
    name: String!
    server: Server!
  }

  type Server {
    id: ID!
    name: String!
    owner: User!
    adminId: Int!
    position: Int
    channels: [Channel]
    users: [User]
    icon: String
    role: String
  }

  type User {
    id: ID!
    name: String!
    servers: [Server]
    adminOfServers: [Server]
  }

  type Message {
    id: ID!
    channel: Channel!
    createdBy: User!
    msg: String
    date: DateTime
  }

  scalar DateTime
`;

module.exports = typeDefs;
