import { HomePage } from "@pages/Home";
import { RouteConfig } from ".";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { NotFoundPage } from "@pages/NotFound";
import { LoginPage } from "@pages/Login";
import { SignUpPage } from "@pages/SignUp";
import AwardsPage from "@pages/Award/AwardsPage";
import { TasksPage } from "@pages/Tasks";

export enum RoutePaths {
  HOME = "/",
  LOGIN = "/login",
  AWARDS = "/awards",
  SIGN_UP = "/sign-up",
  TASKS = "/tasks",
  PROFILE = "/profile",
}

export const menuSpecificRoutes: RouteConfig[] = [
  {
    path: RoutePaths.HOME,
    component: HomePage,
    // TODO: add route specific icons
    Icon: InboxIcon,
    menuTitle: "Recipes",
    isProtected: true,
  },
  {
    path: RoutePaths.AWARDS,
    component: AwardsPage,
    Icon: MailIcon,
    menuTitle: "Awards",
    isProtected: true,
  },
  {
    path: RoutePaths.TASKS,
    component: TasksPage,
    Icon: MailIcon,
    menuTitle: "Tasks",
    isProtected: true,
  },
  {
    path: RoutePaths.PROFILE,
    component: () => null,
    Icon: VerifiedUserIcon,
    exact: true,
    isProtected: true,
    menuTitle: "Profile",
  },
];

const regularRoutes: RouteConfig[] = [
  { path: RoutePaths.LOGIN, component: LoginPage, exact: true },
  { path: RoutePaths.SIGN_UP, component: SignUpPage, exact: true },
];

export const routes: RouteConfig[] = [
  ...menuSpecificRoutes,
  ...regularRoutes,
  {
    path: "*",
    component: NotFoundPage,
  },
];
