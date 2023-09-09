import { apiSlice } from "./apiSlice";
import { apiRoutes } from "../../environment/api";

export const employeeService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: (params: any) => ({
        url: apiRoutes.GET_ALL,
        params: params,
        method: "GET",
      }),
    }),

    createEmploye: builder.mutation({
      query: (formData: any) => {
        return {
          url: apiRoutes.CREATE,
          method: "POST",
          body: formData,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    updateEmployee: builder.mutation({
      query: (formData) => {
        const { id, ...data } = formData;
        return {
          url: `${apiRoutes.UPDATE}/${id}`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    deleteUser: builder.mutation({
      query: (id:any) => {
        return {
          url: `${apiRoutes.DELETE}/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
useCreateEmployeMutation,
useDeleteUserMutation,
useGetAllEmployeesQuery,
useUpdateEmployeeMutation
} = employeeService;
