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
  updateStage: Projectstage;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationUpdateStageArgs = {
  data: UpdateStageInput;
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
  stageDescription: Maybe<Scalars['String']['output']>;
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
  CurrentStages: Array<Projectstage>;
  stage: Projectstage;
  stageStatuses: Array<Stagestatus>;
  stages: Array<Projectstage>;
  user: User;
  users: Array<User>;
};


export type QueryStageArgs = {
  id: Scalars['Float']['input'];
};


export type QueryStagesArgs = {
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

export type UpdateStageInput = {
  endDatePlan: InputMaybe<Scalars['String']['input']>;
  stageDescription: InputMaybe<Scalars['String']['input']>;
  stageId: Scalars['Int']['input'];
  startDatePlan: InputMaybe<Scalars['String']['input']>;
  statusId: InputMaybe<Scalars['Int']['input']>;
  userId: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateStageMutationVariables = Exact<{
  data: UpdateStageInput;
}>;


export type UpdateStageMutation = { __typename: 'Mutation', updateStage: { __typename: 'Projectstage', stageId: number, startDatePlan: string | null, endDatePlan: string | null, statusId: number, task: { __typename: 'Task', taskName: string }, project: { __typename: 'Project', projectName: string }, user: { __typename: 'User', userName: string, userSurname: string } | null } };

export type TaskInfoFragment = { __typename: 'Projectstage', stageId: number, startDatePlan: string | null, endDatePlan: string | null, statusId: number };

export type UserListDataFragment = { __typename: 'User', userId: number, userName: string, userSurname: string };

export type StageStatusDataFragment = { __typename: 'Stagestatus', statusId: number, statusName: string };

export type GetTasksQueryVariables = Exact<{
  userId: InputMaybe<Scalars['Float']['input']>;
  projectId: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetTasksQuery = { __typename: 'Query', stages: Array<{ __typename: 'Projectstage', stageId: number, startDatePlan: string | null, endDatePlan: string | null, statusId: number, task: { __typename: 'Task', taskName: string }, project: { __typename: 'Project', projectName: string }, user: { __typename: 'User', userName: string, userSurname: string } | null }> };

export type LoadTaskCardDataQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LoadTaskCardDataQuery = { __typename: 'Query', stage: { __typename: 'Projectstage', stageDescription: string | null, userId: number | null, stageId: number, startDatePlan: string | null, endDatePlan: string | null, statusId: number, task: { __typename: 'Task', taskName: string }, project: { __typename: 'Project', projectName: string } }, users: Array<{ __typename: 'User', userId: number, userName: string, userSurname: string }>, stageStatuses: Array<{ __typename: 'Stagestatus', statusId: number, statusName: string }> };

export const TaskInfoFragmentDoc = gql`
    fragment TaskInfo on Projectstage {
  stageId
  startDatePlan
  endDatePlan
  statusId
}
    `;
export const UserListDataFragmentDoc = gql`
    fragment userListData on User {
  userId
  userName
  userSurname
}
    `;
export const StageStatusDataFragmentDoc = gql`
    fragment stageStatusData on Stagestatus {
  statusId
  statusName
}
    `;
export const UpdateStageDocument = gql`
    mutation UpdateStage($data: UpdateStageInput!) {
  updateStage(data: $data) {
    ...TaskInfo
    task {
      taskName
    }
    project {
      projectName
    }
    user {
      userName
      userSurname
    }
  }
}
    ${TaskInfoFragmentDoc}`;
export type UpdateStageMutationFn = Apollo.MutationFunction<UpdateStageMutation, UpdateStageMutationVariables>;

/**
 * __useUpdateStageMutation__
 *
 * To run a mutation, you first call `useUpdateStageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStageMutation, { data, loading, error }] = useUpdateStageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateStageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStageMutation, UpdateStageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStageMutation, UpdateStageMutationVariables>(UpdateStageDocument, options);
      }
export type UpdateStageMutationHookResult = ReturnType<typeof useUpdateStageMutation>;
export type UpdateStageMutationResult = Apollo.MutationResult<UpdateStageMutation>;
export type UpdateStageMutationOptions = Apollo.BaseMutationOptions<UpdateStageMutation, UpdateStageMutationVariables>;
export const GetTasksDocument = gql`
    query GetTasks($userId: Float, $projectId: Float) {
  stages(userId: $userId, projectId: $projectId) {
    ...TaskInfo
    task {
      taskName
    }
    project {
      projectName
    }
    user {
      userName
      userSurname
    }
  }
}
    ${TaskInfoFragmentDoc}`;

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
export const LoadTaskCardDataDocument = gql`
    query LoadTaskCardData($id: Float!) {
  stage(id: $id) {
    ...TaskInfo
    stageDescription
    userId
    task {
      taskName
    }
    project {
      projectName
    }
  }
  users {
    ...userListData
  }
  stageStatuses {
    ...stageStatusData
  }
}
    ${TaskInfoFragmentDoc}
${UserListDataFragmentDoc}
${StageStatusDataFragmentDoc}`;

/**
 * __useLoadTaskCardDataQuery__
 *
 * To run a query within a React component, call `useLoadTaskCardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoadTaskCardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoadTaskCardDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLoadTaskCardDataQuery(baseOptions: Apollo.QueryHookOptions<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables> & ({ variables: LoadTaskCardDataQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>(LoadTaskCardDataDocument, options);
      }
export function useLoadTaskCardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>(LoadTaskCardDataDocument, options);
        }
export function useLoadTaskCardDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>(LoadTaskCardDataDocument, options);
        }
export type LoadTaskCardDataQueryHookResult = ReturnType<typeof useLoadTaskCardDataQuery>;
export type LoadTaskCardDataLazyQueryHookResult = ReturnType<typeof useLoadTaskCardDataLazyQuery>;
export type LoadTaskCardDataSuspenseQueryHookResult = ReturnType<typeof useLoadTaskCardDataSuspenseQuery>;
export type LoadTaskCardDataQueryResult = Apollo.QueryResult<LoadTaskCardDataQuery, LoadTaskCardDataQueryVariables>;