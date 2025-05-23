import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

import { useAuth0 } from "@auth0/auth0-react";
import Homepage from "./pages/homepage/Homepage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/slice/userSlice";
import CreateWithAI from "./pages/createwithAI/CreateWithAI";
import UserRegistrationForm from "./pages/registerUser/RegisterUser";
import {
  useGetUserByEmailIdQuery,
  useGetUserQuery,
} from "./store/slice/api/userApi";
import { updateUser } from "./store/slice/updatedUser";
import VideoPlayerPage from "./pages/videoPage/VideoPlayerPage";
import HomeVideoPlayerPage from "./pages/videoPlayerHomePage/VideoPlayerHome";
import OwnModelPage from "./pages/ownModelPage/OwnModelPage";
import UploadVideoPage from "./pages/uploadvideopage/UploadVideoPage";
import OwnModelVideoPlayer from "./pages/ownModelVideoPlayer/OwnModelVideoPlayer";

function App() {
  const [email, setEmail] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const token = JSON.parse(localStorage.getItem("token"));

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  console.log("isLoading", isLoading);

  const dispatch = useDispatch();

  console.log("app", token);

  const { data, isFetching, isError } = useGetUserQuery(token);

  const { data: userEmailData } = useGetUserByEmailIdQuery(email);

  console.log("useremaildata", userEmailData);

  // console.log(data, isFetching, isError);

  useEffect(() => {
    if (userEmailData?.data) {
      dispatch(updateUser(userEmailData.data.user));
      localStorage.setItem("token", JSON.stringify(userEmailData.data.token));
    }
  }, [userEmailData]);

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user?.email);
      dispatch(login(user));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      dispatch(updateUser(data.data));
    }
    const user = {
      email: data?.data?.email,
      name: data?.data?.name,
      picture: data?.data?.picture,
      nickname: data?.data?.nickname,
      family_name: data?.data?.family_name,
      given_name: data?.data?.given_name,
    };

    if (data?.data) {
      dispatch(login(user));
    }
  }, [data]);

  console.log(isAuthenticated, isLoading, user);
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/create-with-ai",
          element: <CreateWithAI />,
        },
        {
          path: "/register",
          element: <UserRegistrationForm />,
        },
        {
          path: "/dashboard/video-player/:videoId",
          element: <VideoPlayerPage />,
        },
        {
          path: "/video-player/:videoId",
          element: <HomeVideoPlayerPage />,
        },
        {
          path: "/dashboard/upload-video",
          element: <UploadVideoPage />,
        },
        {
          path: "/dashboard/own-model",
          element: <OwnModelPage />,
        },

        {
          path: "/dashboard/own-model-video-player",
          element: <OwnModelVideoPlayer />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_partialHydration: true,
    },
  });

  return <RouterProvider router={router} />;
}

export default App;
