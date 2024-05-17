import { HomePage } from "@pages/Home";
import { RouteConfig } from ".";
import { Mail, Inbox, VerifiedUser } from "@mui/icons-material";
import { NotFoundPage } from "@pages/NotFound";
import { LoginPage } from "@pages/Login";
import { SignUpPage } from "@pages/SignUp";
import AwardsPage from "@pages/Award/AwardsPage";
import { TasksPage } from "@pages/Tasks";
import { LinkGroupIds } from "@components/Sidebar/types";
import { WordsRevisionPage } from "@pages/WordsRevision";

export enum RoutePaths {
  HOME = "/",
  LOGIN = "/login",
  AWARDS = "/awards",
  SIGN_UP = "/sign-up",
  TASKS = "/tasks",
  PROFILE = "/profile",
  WORDS_REVISION = "/words-revision",
}

export const menuSpecificRoutes: RouteConfig[] = [
  {
    path: RoutePaths.HOME,
    component: HomePage,
    // TODO: add route specific icons
    Icon: Inbox,
    menuTitle: "Recipes",
    isProtected: true,
    groupId: LinkGroupIds.HOME,
  },
  {
    path: RoutePaths.AWARDS,
    component: AwardsPage,
    Icon: Mail,
    menuTitle: "Awards",
    isProtected: true,
    groupId: LinkGroupIds.HOME,
  },
  {
    path: RoutePaths.TASKS,
    component: TasksPage,
    Icon: Mail,
    menuTitle: "Tasks",
    isProtected: true,
    groupId: LinkGroupIds.HOME,
  },
  // {
  //   path: RoutePaths.PROFILE,
  //   component: () => null,
  //   Icon: VerifiedUser,
  //   exact: true,
  //   isProtected: true,
  //   menuTitle: "Profile",
  //   groupId: LinkGroupIds.HOME,
  // },
  {
    path: RoutePaths.WORDS_REVISION,
    component: WordsRevisionPage,
    Icon: VerifiedUser,
    exact: true,
    isProtected: true,
    menuTitle: "Words",
    groupId: LinkGroupIds.HOME,
  },
];

export const publicRoutes: RouteConfig[] = [
  { path: RoutePaths.LOGIN, component: LoginPage, exact: true },
  { path: RoutePaths.SIGN_UP, component: SignUpPage, exact: true },
];

export const regularLayoutRoutes: RouteConfig[] = [...menuSpecificRoutes];

export const notFoundPageRoute = {
  path: "*",
  component: NotFoundPage,
};
