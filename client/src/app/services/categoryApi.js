import { api } from './api'
const CATEGORY_URL = '/api/category'

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => CATEGORY_URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories', id })),
              { type: 'Categories', id: 'LIST' }
            ]
          : [{ type: 'Categories', id: 'LIST' }]
    }),

    getCategoryById: builder.query({
      query: (categoryId) => `${CATEGORY_URL}/${categoryId}/products`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories', id })),
              { type: 'Categories', id: 'LIST' }
            ]
          : [{ type: 'Categories', id: 'LIST' }]
    }),

    addCategories: builder.mutation({
      query: (body) => ({
        url: `${CATEGORY_URL}/add`,
        method: 'POST',
        body: {
          name: body.name,
          slug: body.slug
        }
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),

    removeCategories: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/remove/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    })
  })
})

export const {
  useGetCategoryQuery,
  useAddCategoriesMutation,
  useGetCategoryByIdQuery,
  useRemoveCategoriesMutation
} = categoryApi
