import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { mockApi } from './mockServer'

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),

  tagTypes: ['User', 'Post'],

  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      async queryFn() {
        try {
          const users = await mockApi.getUsers()

          return {
            data: users,
          }
        } catch {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Failed to fetch users',
            },
          }
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ]
          : [
              {
                type: 'User' as const,
                id: 'LIST',
              },
            ],
    }),

   addPost: builder.mutation<any, any>({
  async queryFn(post) {
    return {
      data: post,
    }
  },

  invalidatesTags: [
    {
      type: 'Post',
      id: 'LIST',
    },
  ],

  async onQueryStarted(post, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      apiSlice.util.updateQueryData(
        'getUsers',
        undefined,
        (draft: any[]) => {
          draft.push({
            ...post,
            id: Date.now(),
          })
        }
      )
    )

    try {
      await queryFulfilled
    } catch {
      patchResult.undo()
    }
  },
}),

getPosts: builder.query<any[], void>({
  async queryFn() {
    try {
      const posts = await mockApi.getPosts()

      return {
        data: posts,
      }
    } catch {
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: 'Failed to fetch posts',
        },
      }
    }
  },

  providesTags: [
    {
      type: 'Post',
      id: 'LIST',
    },
  ],
}),

getPostById: builder.query<any, number>({
  async queryFn(id) {
    try {
      const post = await mockApi.getPostById(id)

      return {
        data: post,
      }
    } catch {
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: 'Failed to fetch post',
        },
      }
    }
  },

  providesTags: (result, error, id) => [
    {
      type: 'Post',
      id,
    },
  ],
}),

  }),
})

export const {
  useGetUsersQuery,
  useAddPostMutation,
    useGetPostsQuery,
    useGetPostByIdQuery,
} = apiSlice