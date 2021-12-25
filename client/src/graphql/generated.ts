import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  roomId: Scalars['Int'];
  senderId: Scalars['ID'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  error?: Maybe<FieldError>;
};

export type ExtendedFieldError = {
  __typename?: 'ExtendedFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  resp: Scalars['String'];
};

export type ExtendedUserRoomResponse = {
  __typename?: 'ExtendedUserRoomResponse';
  error?: Maybe<ExtendedFieldError>;
  userRoom?: Maybe<UserRoom>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatResponse;
  createRoom: RoomResponse;
  createUserRoom: UserRoomResponse;
  joinRoom: ExtendedUserRoomResponse;
  login: UserResponse;
  register: UserResponse;
};


export type MutationCreateChatArgs = {
  roomId: Scalars['ID'];
  senderId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  creatorId: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateUserRoomArgs = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationJoinRoomArgs = {
  publicId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chatById?: Maybe<Chat>;
  chats: Array<Chat>;
  chatsByRoom: Array<Chat>;
  chatsBySender: Array<Chat>;
  me?: Maybe<User>;
  roomById?: Maybe<Room>;
  roomByName?: Maybe<Room>;
  roomByPublicId?: Maybe<Room>;
  rooms: Array<Room>;
  roomsByCreator: Array<Room>;
  roomsByJoin: Array<Room>;
  roomsByUser: Array<Room>;
  userById?: Maybe<User>;
  userByName?: Maybe<User>;
  userRoom: UserRoom;
  userRooms: Array<UserRoom>;
  userRoomsByRoom: Array<UserRoom>;
  userRoomsByUser: Array<UserRoom>;
  users: Array<User>;
};


export type QueryChatByIdArgs = {
  id: Scalars['ID'];
};


export type QueryChatsByRoomArgs = {
  roomId: Scalars['ID'];
};


export type QueryChatsBySenderArgs = {
  senderId: Scalars['ID'];
};


export type QueryRoomByIdArgs = {
  id: Scalars['ID'];
};


export type QueryRoomByNameArgs = {
  name: Scalars['String'];
};


export type QueryRoomByPublicIdArgs = {
  publicId: Scalars['String'];
};


export type QueryRoomsByCreatorArgs = {
  creatorId: Scalars['ID'];
};


export type QueryRoomsByJoinArgs = {
  userId: Scalars['ID'];
};


export type QueryRoomsByUserArgs = {
  userId: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserRoomArgs = {
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryUserRoomsByRoomArgs = {
  roomId: Scalars['ID'];
};


export type QueryUserRoomsByUserArgs = {
  userId: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  publicId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RoomResponse = {
  __typename?: 'RoomResponse';
  error?: Maybe<FieldError>;
  room?: Maybe<Room>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type UserRoom = {
  __typename?: 'UserRoom';
  creator: Scalars['Boolean'];
  roomId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UserRoomResponse = {
  __typename?: 'UserRoomResponse';
  error?: Maybe<FieldError>;
  userRoom?: Maybe<UserRoom>;
};

export type CreateChatMutationVariables = Exact<{
  text: Scalars['String'];
  senderId: Scalars['ID'];
  roomId: Scalars['ID'];
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'ChatResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, chat?: { __typename?: 'Chat', id: string, text: string, roomId: number, senderId: string } | null | undefined } };

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  creatorId: Scalars['ID'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'RoomResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, room?: { __typename?: 'Room', id: string, publicId: string, name: string, description: string, creatorId: number } | null | undefined } };

export type JoinRoomMutationVariables = Exact<{
  publicId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type JoinRoomMutation = { __typename?: 'Mutation', joinRoom: { __typename?: 'ExtendedUserRoomResponse', error?: { __typename?: 'ExtendedFieldError', field: string, message: string, resp: string } | null | undefined, userRoom?: { __typename?: 'UserRoom', userId: string, roomId: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null | undefined, user?: { __typename?: 'User', id: string, name: string } | null | undefined } };

export type GetChatsByRoomQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type GetChatsByRoomQuery = { __typename?: 'Query', chatsByRoom: Array<{ __typename?: 'Chat', id: string, text: string, senderId: string, createdAt: string }> };

export type GetRoomByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRoomByIdQuery = { __typename?: 'Query', roomById?: { __typename?: 'Room', id: string, name: string, description: string, createdAt: string, publicId: string } | null | undefined };

export type RoomsByCreatorQueryVariables = Exact<{
  creatorId: Scalars['ID'];
}>;


export type RoomsByCreatorQuery = { __typename?: 'Query', roomsByCreator: Array<{ __typename?: 'Room', id: string, name: string, publicId: string }> };

export type RoomsByJoinQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RoomsByJoinQuery = { __typename?: 'Query', roomsByJoin: Array<{ __typename?: 'Room', id: string, name: string, publicId: string }> };

export type RoomsByUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RoomsByUserQuery = { __typename?: 'Query', roomsByUser: Array<{ __typename?: 'Room', id: string, name: string, publicId: string }> };

export type UserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'User', id: string, name: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string } | null | undefined };


export const CreateChatDocument = `
    mutation CreateChat($text: String!, $senderId: ID!, $roomId: ID!) {
  createChat(text: $text, senderId: $senderId, roomId: $roomId) {
    error {
      field
      message
    }
    chat {
      id
      text
      roomId
      senderId
    }
  }
}
    `;
export const useCreateChatMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateChatMutation, TError, CreateChatMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateChatMutation, TError, CreateChatMutationVariables, TContext>(
      'CreateChat',
      (variables?: CreateChatMutationVariables) => fetcher<CreateChatMutation, CreateChatMutationVariables>(client, CreateChatDocument, variables, headers)(),
      options
    );
export const CreateRoomDocument = `
    mutation CreateRoom($name: String!, $description: String!, $creatorId: ID!) {
  createRoom(name: $name, description: $description, creatorId: $creatorId) {
    error {
      field
      message
    }
    room {
      id
      publicId
      name
      description
      creatorId
    }
  }
}
    `;
export const useCreateRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>(
      'CreateRoom',
      (variables?: CreateRoomMutationVariables) => fetcher<CreateRoomMutation, CreateRoomMutationVariables>(client, CreateRoomDocument, variables, headers)(),
      options
    );
export const JoinRoomDocument = `
    mutation JoinRoom($publicId: ID!, $userId: ID!) {
  joinRoom(publicId: $publicId, userId: $userId) {
    error {
      field
      message
      resp
    }
    userRoom {
      userId
      roomId
    }
  }
}
    `;
export const useJoinRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<JoinRoomMutation, TError, JoinRoomMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<JoinRoomMutation, TError, JoinRoomMutationVariables, TContext>(
      'JoinRoom',
      (variables?: JoinRoomMutationVariables) => fetcher<JoinRoomMutation, JoinRoomMutationVariables>(client, JoinRoomDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    error {
      field
      message
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      'Login',
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const RegisterDocument = `
    mutation Register($name: String!, $password: String!) {
  register(name: $name, password: $password) {
    error {
      field
      message
    }
    user {
      id
      name
    }
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      'Register',
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const GetChatsByRoomDocument = `
    query GetChatsByRoom($roomId: ID!) {
  chatsByRoom(roomId: $roomId) {
    id
    text
    senderId
    createdAt
  }
}
    `;
export const useGetChatsByRoomQuery = <
      TData = GetChatsByRoomQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetChatsByRoomQueryVariables,
      options?: UseQueryOptions<GetChatsByRoomQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetChatsByRoomQuery, TError, TData>(
      ['GetChatsByRoom', variables],
      fetcher<GetChatsByRoomQuery, GetChatsByRoomQueryVariables>(client, GetChatsByRoomDocument, variables, headers),
      options
    );
export const GetRoomByIdDocument = `
    query GetRoomById($id: ID!) {
  roomById(id: $id) {
    id
    name
    description
    createdAt
    publicId
  }
}
    `;
export const useGetRoomByIdQuery = <
      TData = GetRoomByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetRoomByIdQueryVariables,
      options?: UseQueryOptions<GetRoomByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetRoomByIdQuery, TError, TData>(
      ['GetRoomById', variables],
      fetcher<GetRoomByIdQuery, GetRoomByIdQueryVariables>(client, GetRoomByIdDocument, variables, headers),
      options
    );
export const RoomsByCreatorDocument = `
    query RoomsByCreator($creatorId: ID!) {
  roomsByCreator(creatorId: $creatorId) {
    id
    name
    publicId
  }
}
    `;
export const useRoomsByCreatorQuery = <
      TData = RoomsByCreatorQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: RoomsByCreatorQueryVariables,
      options?: UseQueryOptions<RoomsByCreatorQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RoomsByCreatorQuery, TError, TData>(
      ['RoomsByCreator', variables],
      fetcher<RoomsByCreatorQuery, RoomsByCreatorQueryVariables>(client, RoomsByCreatorDocument, variables, headers),
      options
    );
export const RoomsByJoinDocument = `
    query RoomsByJoin($userId: ID!) {
  roomsByJoin(userId: $userId) {
    id
    name
    publicId
  }
}
    `;
export const useRoomsByJoinQuery = <
      TData = RoomsByJoinQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: RoomsByJoinQueryVariables,
      options?: UseQueryOptions<RoomsByJoinQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RoomsByJoinQuery, TError, TData>(
      ['RoomsByJoin', variables],
      fetcher<RoomsByJoinQuery, RoomsByJoinQueryVariables>(client, RoomsByJoinDocument, variables, headers),
      options
    );
export const RoomsByUserDocument = `
    query RoomsByUser($userId: ID!) {
  roomsByUser(userId: $userId) {
    id
    name
    publicId
  }
}
    `;
export const useRoomsByUserQuery = <
      TData = RoomsByUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: RoomsByUserQueryVariables,
      options?: UseQueryOptions<RoomsByUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RoomsByUserQuery, TError, TData>(
      ['RoomsByUser', variables],
      fetcher<RoomsByUserQuery, RoomsByUserQueryVariables>(client, RoomsByUserDocument, variables, headers),
      options
    );
export const UserByIdDocument = `
    query UserById($id: ID!) {
  userById(id: $id) {
    id
    name
  }
}
    `;
export const useUserByIdQuery = <
      TData = UserByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserByIdQueryVariables,
      options?: UseQueryOptions<UserByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserByIdQuery, TError, TData>(
      ['UserById', variables],
      fetcher<UserByIdQuery, UserByIdQueryVariables>(client, UserByIdDocument, variables, headers),
      options
    );
export const MeDocument = `
    query Me {
  me {
    id
    name
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );