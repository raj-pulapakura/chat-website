import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { graphqlClient } from "../../graphql/client";
import { useMeQuery } from "../../graphql/generated";
import { DashboardPage } from "../../pages/Dashboard/_index";
import { HomePage } from "../../pages/Home/_index";
import { LoginPage } from "../../pages/Login/_index";
import { RegisterPage } from "../../pages/Register/_index";
import { RoomPage } from "../../pages/Room/_index";
import { Layout } from "../Layout/_index";

interface AppRouterProps {}

export class RouteRecord {
  constructor(public path: string, public component: JSX.Element) {}
}

export const routes = {
  home: new RouteRecord("/", <HomePage />),
  register: new RouteRecord("/register", <RegisterPage />),
  login: new RouteRecord("/login", <LoginPage />),
  dashboard: new RouteRecord("/", <DashboardPage />),
  room: new RouteRecord("/rooms/:id", <RoomPage />),
};

export const AppRouter: React.FC<AppRouterProps> = ({}) => {
  const { data: meData } = useMeQuery(graphqlClient);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {meData?.me?.account ? (
            <>
              <Route
                path={routes.dashboard.path}
                element={routes.dashboard.component}
              />
              <Route path={routes.room.path} element={routes.room.component} />
            </>
          ) : (
            <>
              <Route path={routes.home.path} element={routes.home.component} />
              <Route
                path={routes.register.path}
                element={routes.register.component}
              />
              <Route
                path={routes.login.path}
                element={routes.login.component}
              />
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
