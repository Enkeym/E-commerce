import { api } from './api'
const ORDERS_URL = '/api/orders'

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `${ORDERS_URL}/my`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders ', id })),
              { type: 'Orders', id: 'LIST' }
            ]
          : [{ type: 'Orders ', id: 'LIST' }]
    }),

    getOrdersById: builder.query({
      query: (id) => `${ORDERS_URL}/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Orders', id: result.id }] : ['Orders']
    }),

    addOrders: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: 'POST',
        body: order
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),

    removeOrders: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    })
  })
})

export const {
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useAddOrdersMutation,
  useRemoveOrdersMutation
} = ordersApi
