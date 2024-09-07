import { ComponentType } from "react";
import LoginPage from "../pages/LoginPage";
import EventsPage from "../pages/EventsPage";

export interface IRoute {
  path: string;
  component: ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  EVENT = "/",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, exact: true, component: LoginPage },
];

export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENT, exact: true, component: EventsPage },
];
