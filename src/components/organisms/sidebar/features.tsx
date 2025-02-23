import { Pencil, UserRound } from "lucide-react";

import Icons from "@/assets/icons";
import PracticeIcon from "@/assets/icons/practice";

import { SideBarFeatureProps } from "./side-bar-feature";

const features: SideBarFeatureProps[] = [
  {
    to: "/daily-lesson",
    icon: <Icons.Book fill="#b4b4b4" color="#b4b4b4" height={20} width={20} />,
    activeIcon: <Icons.Book fill="#c2410c" color="#c2410c" height={20} width={20} />,
    label: "dailyLesson",
  },
  {
    to: "/practice",
    icon: <PracticeIcon fill="#b4b4b4" color="#b4b4b4" />,
    activeIcon: <PracticeIcon fill="#c2410c" color="#c2410c" />,
    label: "practice",
  },
  {
    to: "/shop",
    icon: <Icons.Store fill="#b4b4b4" color="#b4b4b4" />,
    activeIcon: <Icons.Store fill="#c2410c" color="#c2410c" />,
    label: "shop",
  },
  {
    to: "/profile",
    icon: <UserRound fill="#b4b4b4" color="#b4b4b4" />,
    activeIcon: <UserRound fill="#c2410c" color="#c2410c" />,
    label: "settings",
    className: "md:hidden",
    child: [
      {
        to: "/profile/history",
        label: "history",
        className: "md:hidden",
      },
      {
        to: "/profile/transactions",
        label: "transactions",
        className: "md:hidden",
      },
      {
        to: "/profile/change-password",
        label: "changePassword",
        className: "md:hidden",
      },
    ],
  },
];

const adminFeatures: SideBarFeatureProps[] = [
  {
    to: "/content-editor",
    icon: <Pencil fillOpacity={0} fill="#b4b4b4" color="#b4b4b4" />,
    activeIcon: <Pencil color="#c2410c" />,
    label: "contentEditor",
  },
];

export { adminFeatures, features };
