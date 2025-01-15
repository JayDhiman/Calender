// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logoutUser, selectCurrentToken } from "../../features/Auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:8000/api/v1/auth",
//   credentials: "include", // include the cookies
//   prepareHeaders: (headers,{getState}) => {
//     const token = selectCurrentToken(getState());
//     console.log(token)
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     // Add other default headers here
//     headers.set('Content-Type', 'application/json');
//     // Add any other required headers here

//     return headers;
//   },

// });

// // // to get the access Token in case it expires

// // const baseQueryWithReauth = async (args, api, extraOptions) => {
// //   let result = await baseQuery(args, api, extraOptions);

// //   console.log("API response:", result);

// //   if (result.error && result.error.status === 401) {
// //     // Attempt to refresh the token
// //     const refreshResult = await baseQuery(
// //       "/auth/refresh-token",
// //       api,
// //       extraOptions
// //     );
// //     if (refreshResult?.data) {
// //       const user = api.getState().auth.user;
// //       // Update user state with the new credentials
// //       api.dispatch(setCredentials({ ...refreshResult.data, user }));
// //       // Retry the original request
// //       result = await baseQuery(args, api, extraOptions);
// //     } else {
// //       // Logout if the refresh fails
// //       api.dispatch(logoutUser());
// //     }
// //   }

// //   return result;
// // };

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery,
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOutUser } from "../../Service/Auth/authService";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/auth",
  credentials: "include", // Ensure cookies are sent and received
});

const baseQueryWithReauth =  async (args, api, extraOptions)=>{
  let result =  await baseQuery(args,api,extraOptions)
  


    if(result?.error?.status === 401){

  const refreshResult = await baseQuery({
        url: "/refresh-token",
        method: "POST", // Ensure the method is POST
        // Include refresh token from cookies
      }, api, extraOptions);
      
      if(refreshResult?.data){
        api.dispatch(setCredentials({...refreshResult.data}))

        result= await baseQuery(args,api,extraOptions)
      }
      else{
        if(refreshResult?.error?.status === 401) {
          refreshResult.error.data.message = "Your Login expired"
        }
        return refreshResult
      }
    }
    return result
}







export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes:["User"],
  endpoints: (builder) => ({}),
});