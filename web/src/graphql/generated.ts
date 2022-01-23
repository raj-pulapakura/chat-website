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

export type AcceptInviteRequestResponse = {
  __typename?: 'AcceptInviteRequestResponse';
  error?: Maybe<Error>;
  successfullyAccepted: Scalars['Boolean'];
};

export type AccountGeneralResponse = {
  __typename?: 'AccountGeneralResponse';
  account?: Maybe<AccountGraphql>;
  error?: Maybe<FieldError>;
};

export type AccountGraphql = {
  __typename?: 'AccountGraphql';
  chats: Array<ChatGraphql>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  inviteRequestsReceived: Array<InviteRequestGraphql>;
  inviteRequestsSent: Array<InviteRequestGraphql>;
  password: Scalars['String'];
  rooms: Array<RoomGraphql>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type ChatGeneralResponse = {
  __typename?: 'ChatGeneralResponse';
  chat?: Maybe<ChatGraphql>;
  error?: Maybe<FieldError>;
};

export type ChatGraphql = {
  __typename?: 'ChatGraphql';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  roomId: Scalars['ID'];
  senderId: Scalars['ID'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateChatInput = {
  roomId: Scalars['ID'];
  senderId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreateRoomInput = {
  creatorId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Error = FieldError | TargettedError;

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
  ufm: Scalars['String'];
};

export type InviteRequestGeneralResponse = {
  __typename?: 'InviteRequestGeneralResponse';
  error?: Maybe<Error>;
  inviteRequest?: Maybe<InviteRequestGraphql>;
};

export type InviteRequestGraphql = {
  __typename?: 'InviteRequestGraphql';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  recepientId: Scalars['ID'];
  roomId: Scalars['ID'];
  senderId: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type InviteRequestInput = {
  recepientId: Scalars['ID'];
  roomId: Scalars['ID'];
  senderId: Scalars['ID'];
};

export type JoinAccountToRoomResponse = {
  __typename?: 'JoinAccountToRoomResponse';
  error?: Maybe<FieldError>;
  successfullyJoined: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInviteRequest: AcceptInviteRequestResponse;
  createChat: ChatGeneralResponse;
  createInviteRequest: InviteRequestGeneralResponse;
  createRoom: RoomGeneralResponse;
  deleteAccount: Scalars['Boolean'];
  joinRoom: JoinAccountToRoomResponse;
  login: AccountGeneralResponse;
  logout: Scalars['Boolean'];
  register: AccountGeneralResponse;
};


export type MutationAcceptInviteRequestArgs = {
  input: InviteRequestInput;
};


export type MutationCreateChatArgs = {
  input: CreateChatInput;
};


export type MutationCreateInviteRequestArgs = {
  input: InviteRequestInput;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  accountId: Scalars['ID'];
  roomId: Scalars['ID'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  accountById: AccountGeneralResponse;
  accountByUsername: AccountGeneralResponse;
  accounts: Array<AccountGraphql>;
  me: AccountGeneralResponse;
  room: RoomGeneralResponse;
  rooms: Array<RoomGraphql>;
};


export type QueryAccountByIdArgs = {
  accountId: Scalars['ID'];
};


export type QueryAccountByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryRoomArgs = {
  roomId: Scalars['ID'];
};

export type RegisterInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RoomGeneralResponse = {
  __typename?: 'RoomGeneralResponse';
  error?: Maybe<FieldError>;
  room?: Maybe<RoomGraphql>;
};

export type RoomGraphql = {
  __typename?: 'RoomGraphql';
  chats: Array<ChatGraphql>;
  createdAt: Scalars['String'];
  creatorId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TargettedError = {
  __typename?: 'TargettedError';
  message: Scalars['String'];
  ufm: Scalars['String'];
};

export type FieldErrorFragmentFragment = { __typename?: 'FieldError', field: string, message: string, ufm: string };

export type CreateChatMutationVariables = Exact<{
  input: CreateChatInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'ChatGeneralResponse', chat?: { __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type CreateInviteRequestMutationVariables = Exact<{
  input: InviteRequestInput;
}>;


export type CreateInviteRequestMutation = { __typename?: 'Mutation', createInviteRequest: { __typename?: 'InviteRequestGeneralResponse', error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | { __typename?: 'TargettedError', message: string, ufm: string } | null | undefined, inviteRequest?: { __typename?: 'InviteRequestGraphql', id: string, createdAt: string, updatedAt: string, senderId: string, recepientId: string, roomId: string } | null | undefined } };

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'RoomGeneralResponse', room?: { __typename?: 'RoomGraphql', id: string, createdAt: string, title: string, updatedAt: string, description?: string | null | undefined, creatorId: string, chats: Array<{ __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string }> } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'AccountGraphql', id: string, createdAt: string, updatedAt: string, username: string, password: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'AccountGraphql', id: string, createdAt: string, updatedAt: string, password: string, username: string, rooms: Array<{ __typename?: 'RoomGraphql', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null | undefined, creatorId: string, chats: Array<{ __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string }> }> } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type AccountByIdQueryVariables = Exact<{
  accountId: Scalars['ID'];
}>;


export type AccountByIdQuery = { __typename?: 'Query', accountById: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'AccountGraphql', id: string, createdAt: string, updatedAt: string, username: string, password: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type AccountByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type AccountByUsernameQuery = { __typename?: 'Query', accountByUsername: { __typename?: 'AccountGeneralResponse', account?: { __typename?: 'AccountGraphql', id: string, createdAt: string, updatedAt: string, username: string, password: string } | null | undefined, error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AccountGeneralResponse', error?: { __typename?: 'FieldError', field: string, message: string, ufm: string } | null | undefined, account?: { __typename?: 'AccountGraphql', id: string, createdAt: string, updatedAt: string, password: string, username: string, rooms: Array<{ __typename?: 'RoomGraphql', id: string, createdAt: string, updatedAt: string, title: string, description?: string | null | undefined, creatorId: string, chats: Array<{ __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string }> }>, chats: Array<{ __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string }>, inviteRequestsSent: Array<{ __typename?: 'InviteRequestGraphql', id: string, createdAt: string, updatedAt: string, senderId: string, recepientId: string, roomId: string }>, inviteRequestsReceived: Array<{ __typename?: 'InviteRequestGraphql', id: string, createdAt: string, updatedAt: string, senderId: string, recepientId: string, roomId: string }> } | null | undefined } };

export type RoomQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomQuery = { __typename?: 'Query', room: { __typename?: 'RoomGeneralResponse', room?: { __typename?: 'RoomGraphql', id: string, createdAt: string, title: string, updatedAt: string, creatorId: string, description?: string | null | undefined, chats: Array<{ __typename?: 'ChatGraphql', id: string, createdAt: string, updatedAt: string, text: string, senderId: string, roomId: string }> } | null | undefined } };

export const FieldErrorFragmentFragmentDoc = `
    fragment FieldErrorFragment on FieldError {
  field
  message
  ufm
}
    `;
export const CreateChatDocument = `
    mutation CreateChat($input: CreateChatInput!) {
  createChat(input: $input) {
    chat {
      id
      createdAt
      updatedAt
      text
      senderId
      roomId
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
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
export const CreateInviteRequestDocument = `
    mutation CreateInviteRequest($input: InviteRequestInput!) {
  createInviteRequest(input: $input) {
    error {
      ... on FieldError {
        field
        message
        ufm
      }
      ... on TargettedError {
        message
        ufm
      }
    }
    inviteRequest {
      id
      createdAt
      updatedAt
      senderId
      recepientId
      roomId
    }
  }
}
    `;
export const useCreateInviteRequestMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateInviteRequestMutation, TError, CreateInviteRequestMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateInviteRequestMutation, TError, CreateInviteRequestMutationVariables, TContext>(
      'CreateInviteRequest',
      (variables?: CreateInviteRequestMutationVariables) => fetcher<CreateInviteRequestMutation, CreateInviteRequestMutationVariables>(client, CreateInviteRequestDocument, variables, headers)(),
      options
    );
export const CreateRoomDocument = `
    mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    room {
      id
      createdAt
      title
      updatedAt
      description
      creatorId
      chats {
        id
        createdAt
        updatedAt
        text
        senderId
        roomId
      }
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
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
export const LoginDocument = `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    account {
      id
      createdAt
      updatedAt
      username
      password
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
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
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      'Logout',
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const RegisterDocument = `
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    account {
      id
      createdAt
      updatedAt
      password
      username
      rooms {
        id
        createdAt
        updatedAt
        title
        description
        creatorId
        chats {
          id
          createdAt
          updatedAt
          text
          senderId
          roomId
        }
      }
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
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
export const AccountByIdDocument = `
    query AccountById($accountId: ID!) {
  accountById(accountId: $accountId) {
    account {
      id
      createdAt
      updatedAt
      username
      password
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
export const useAccountByIdQuery = <
      TData = AccountByIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: AccountByIdQueryVariables,
      options?: UseQueryOptions<AccountByIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AccountByIdQuery, TError, TData>(
      ['AccountById', variables],
      fetcher<AccountByIdQuery, AccountByIdQueryVariables>(client, AccountByIdDocument, variables, headers),
      options
    );
export const AccountByUsernameDocument = `
    query AccountByUsername($username: String!) {
  accountByUsername(username: $username) {
    account {
      id
      createdAt
      updatedAt
      username
      password
    }
    error {
      ...FieldErrorFragment
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
export const useAccountByUsernameQuery = <
      TData = AccountByUsernameQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: AccountByUsernameQueryVariables,
      options?: UseQueryOptions<AccountByUsernameQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<AccountByUsernameQuery, TError, TData>(
      ['AccountByUsername', variables],
      fetcher<AccountByUsernameQuery, AccountByUsernameQueryVariables>(client, AccountByUsernameDocument, variables, headers),
      options
    );
export const MeDocument = `
    query Me {
  me {
    error {
      ...FieldErrorFragment
    }
    account {
      id
      createdAt
      updatedAt
      password
      username
      rooms {
        id
        createdAt
        updatedAt
        title
        description
        creatorId
        chats {
          id
          createdAt
          updatedAt
          text
          senderId
          roomId
        }
      }
      chats {
        id
        createdAt
        updatedAt
        text
        senderId
        roomId
      }
      inviteRequestsSent {
        id
        createdAt
        updatedAt
        senderId
        recepientId
        roomId
      }
      inviteRequestsReceived {
        id
        createdAt
        updatedAt
        senderId
        recepientId
        roomId
      }
    }
  }
}
    ${FieldErrorFragmentFragmentDoc}`;
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
export const RoomDocument = `
    query Room($roomId: ID!) {
  room(roomId: $roomId) {
    room {
      id
      createdAt
      title
      updatedAt
      creatorId
      chats {
        id
        createdAt
        updatedAt
        text
        senderId
        roomId
      }
      description
    }
  }
}
    `;
export const useRoomQuery = <
      TData = RoomQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: RoomQueryVariables,
      options?: UseQueryOptions<RoomQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RoomQuery, TError, TData>(
      ['Room', variables],
      fetcher<RoomQuery, RoomQueryVariables>(client, RoomDocument, variables, headers),
      options
    );