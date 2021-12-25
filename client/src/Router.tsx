import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateRoomStage1Page } from "./pages/CreateRoom-1/CreateRoom-1.page";
import { CreateRoomStage2Page } from "./pages/CreateRoom-2/CreateRoom-2.page";
import { RegisterPage } from "./pages/Register/Register.page";
import { LoginPage } from "./pages/Login/Login.page";
import { DashboardPage } from "./pages/Dashboard/Dashboard.page";
import { JoinRoomPage } from "./pages/JoinRoom/JoinRoom.page";
import { NewUserPage } from "./pages/NewUser/NewUser.page";
import { useMeQuery } from "./graphql/generated";
import { graphqlClient } from "./graphql/client";

interface RouterProps {}

export const Router: React.FC<RouterProps> = ({}) => {
  const { data } = useMeQuery(graphqlClient, {}, {});
  return (
    <BrowserRouter>
      <Routes>
        {data?.me ? (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route
              path="/create-room/stage-1"
              element={<CreateRoomStage1Page />}
            />
            <Route
              path="/create-room/stage-2/"
              element={<CreateRoomStage2Page />}
            />
            <Route path="/join-room/" element={<JoinRoomPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<NewUserPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
