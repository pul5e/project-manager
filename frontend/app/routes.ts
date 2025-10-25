//React Router route configuration for authentication pages www.reactrouter.com/start/framework/routing/

// Define the route configuration for the authentication section
// This includes routes for sign-in, sign-up, forgot password, reset password, and email verification
// All these routes are nested under the AuthLayout
// which provides a common layout for authentication pages
// The home route is also included as the index route
// under the AuthLayout for easy access to login and sign-up options
// from the homepage.

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

// The structure is as follows:
// / (AuthLayout)
//   |-- / (Homepage)
//   |-- /sign-in (SignIn)
//   |-- /sign-up (SignUp)
//   |-- /forgot-password (ForgotPassword)
//   |-- /reset-password (ResetPassword)
//   |-- /verify-email (VerifyEmail)

export default [
  layout("routes/auth/auth-layout.tsx", [
    index("routes/root/home.tsx"),
    route("sign-in", "routes/auth/sign-in.tsx"),
    route("sign-up", "routes/auth/sign-up.tsx"),
    route("forgot-password", "routes/auth/forgot-password.tsx"),
    route("reset-password", "routes/auth/reset-password.tsx"),
    route("verify-email", "routes/auth/verify-email.tsx"),
  ]),
] satisfies RouteConfig;

// This configuration ensures a clean and organized routing structure
// for the authentication-related pages in the application.
