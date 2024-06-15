import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Mutation = {
  __typename: 'Mutation';
  createUser: User;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Project = {
  __typename: 'Project';
  endDateFact: Scalars['Date']['output'];
  endDatePlan: Scalars['Date']['output'];
  ended: Scalars['Boolean']['output'];
  projectDescription: Scalars['String']['output'];
  projectId: Scalars['Int']['output'];
  projectName: Scalars['String']['output'];
  startDateFact: Scalars['Date']['output'];
  startDatePlan: Scalars['Date']['output'];
  typeId: Scalars['Int']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type Projectstage = {
  __typename: 'Projectstage';
  endDateFact: Maybe<Scalars['String']['output']>;
  endDatePlan: Maybe<Scalars['String']['output']>;
  project: Project;
  projectId: Scalars['Int']['output'];
  stageDescription: Scalars['String']['output'];
  stageId: Scalars['Int']['output'];
  stageNumber: Scalars['Int']['output'];
  startDateFact: Maybe<Scalars['String']['output']>;
  startDatePlan: Maybe<Scalars['String']['output']>;
  status: Stagestatus;
  statusId: Scalars['Int']['output'];
  task: Task;
  taskId: Scalars['Int']['output'];
  user: Maybe<User>;
  userId: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename: 'Query';
  getCurrentStages: Array<Projectstage>;
  getTasks: Array<Projectstage>;
  user: User;
  users: Array<User>;
};


export type QueryGetTasksArgs = {
  projectId: InputMaybe<Scalars['Float']['input']>;
  userId: InputMaybe<Scalars['Float']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['Float']['input'];
};

export type Stagestatus = {
  __typename: 'Stagestatus';
  statusId: Scalars['Int']['output'];
  statusName: Scalars['String']['output'];
};

export type Task = {
  __typename: 'Task';
  taskId: Scalars['Int']['output'];
  taskName: Scalars['String']['output'];
  timeDays: Scalars['Int']['output'];
};

export type UpdateUserInput = {
  userEmail: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  userName: InputMaybe<Scalars['String']['input']>;
  userSurname: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename: 'User';
  projects: Array<Project>;
  projectstages: Array<Projectstage>;
  userEmail: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
  userName: Scalars['String']['output'];
  userSurname: Scalars['String']['output'];
};

export type UserInput = {
  userEmail: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  userSurname: Scalars['String']['input'];
};

export type GetTasksQueryVariables = Exact<{
  userId: InputMaybe<Scalars['Float']['input']>;
  projectId: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetTasksQuery = { __typename: 'Query', getTasks: Array<{ __typename: 'Projectstage', stageId: number, startDatePlan: string | null, endDatePlan: string | null, status: { __typename: 'Stagestatus', statusId: number, statusName: string }, task: { __typename: 'Task', taskId: number, taskName: string }, project: { __typename: 'Project', projectId: number, projectName: string }, user: { __typename: 'User', userId: number, userName: string, userSurname: string } | null }> };


export const GetTasksDocument = gql`
    query GetTasks($userId: Float, $projectId: Float) {
  getTasks(userId: $userId, projectId: $projectId) {
    stageId
    startDatePlan
    endDatePlan
    status {
      statusId
      statusName
    }
    task {
      taskId
      taskName
    }
    project {
      projectId
      projectName
    }
    user {
      userId
      userName
      userSurname
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;