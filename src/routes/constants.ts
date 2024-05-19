import { HomePage } from "@pages/Home";
import { RouteConfig } from ".";
import { NotFoundPage } from "@pages/NotFound";
import { LoginPage } from "@pages/Login";
import { SignUpPage } from "@pages/SignUp";
import AwardsPage from "@pages/Award/AwardsPage";
import { TasksPage } from "@pages/Tasks";
import { LinkGroupIds } from "@components/Sidebar/types";
import { WordsRevisionPage } from "@pages/WordsRevision";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import TranslateIcon from "@mui/icons-material/Translate";

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
    Icon: CalendarMonthIcon,
    menuTitle: "Calendar",
    isProtected: true,
    groupId: LinkGroupIds.HOME,
  },
  {
    path: RoutePaths.AWARDS,
    component: AwardsPage,
    Icon: EmojiEventsIcon,
    menuTitle: "Awards",
    isProtected: true,
    groupId: LinkGroupIds.HOME,
  },
  {
    path: RoutePaths.TASKS,
    component: TasksPage,
    Icon: AssignmentTurnedInIcon,
    menuTitle: "Challenges",
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
    Icon: TranslateIcon,
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
