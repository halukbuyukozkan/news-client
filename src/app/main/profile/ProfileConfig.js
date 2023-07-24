import { lazy } from "react";

const Profile = lazy(() => import("./profile"));

const ProfileConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/profile",
      element: <Profile />,
    },
  ],
};

export default ProfileConfig;
