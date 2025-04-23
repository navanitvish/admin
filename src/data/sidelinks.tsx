// import {
//   IconApps,
//   IconBarrierBlock,
//   IconBoxSeam,
//   IconChartHistogram,
//   IconChecklist,
//   IconComponents,
//   IconError404,
//   IconExclamationCircle,
//   IconHexagonNumber1,
//   IconHexagonNumber2,
//   IconHexagonNumber3,
//   IconHexagonNumber4,
//   IconHexagonNumber5,
//   IconLayoutDashboard,
//   IconMessages,
//   IconRouteAltLeft,
//   IconServerOff,
//   IconSettings,
//   IconTruck,
//   IconUserShield,
//   IconUsers,
//   IconLock,
// } from "@tabler/icons-react";
// import { BoxIcon, HelpCircleIcon } from "lucide-react";

// export interface NavLink {
//   title: string;
//   label?: string;
//   href: string;
//   icon: JSX.Element;
// }

// export interface SideLink extends NavLink {
//   sub?: NavLink[];
// }

// export const sidelinks: SideLink[] = [
//   // {
//   //   title: "Dashboard",
//   //   label: "",
//   //   href: "/",
//   //   icon: <IconLayoutDashboard size={18} />,
//   // },
//   // {
//   //   title: 'Tasks',
//   //   label: '3',
//   //   href: '/tasks',
//   //   icon: <IconChecklist size={18} />,
//   // },
//   // {
//   //   title: 'Chats',
//   //   label: '9',
//   //   href: '/chats',
//   //   icon: <IconMessages size={18} />,
//   // },
//   // {
//   //   title: 'Apps',
//   //   label: '',
//   //   href: '/apps',
//   //   icon: <IconApps size={18} />,
//   // },
//   // {
//   //   title: 'Authentication',
//   //   label: '',
//   //   href: '',
//   //   icon: <IconUserShield size={18} />,
//   //   sub: [
//   //     {
//   //       title: 'Sign In (email + password)',
//   //       label: '',
//   //       href: '/sign-in',
//   //       icon: <IconHexagonNumber1 size={18} />,
//   //     },
//   //     {
//   //       title: 'Sign In (Box)',
//   //       label: '',
//   //       href: '/sign-in-2',
//   //       icon: <IconHexagonNumber2 size={18} />,
//   //     },
//   //     {
//   //       title: 'Sign Up',
//   //       label: '',
//   //       href: '/sign-up',
//   //       icon: <IconHexagonNumber3 size={18} />,
//   //     },
//   //     {
//   //       title: 'Forgot Password',
//   //       label: '',
//   //       href: '/forgot-password',
//   //       icon: <IconHexagonNumber4 size={18} />,
//   //     },
//   //     {
//   //       title: 'OTP',
//   //       label: '',
//   //       href: '/otp',
//   //       icon: <IconHexagonNumber5 size={18} />,
//   //     },
//   //   ],
//   // },
//   // {
//   //   title: 'Users',
//   //   label: '',
//   //   href: '/users',
//   //   icon: <IconUsers size={18} />,
//   // },
//   // {
//   //   title: 'Requests',
//   //   label: '10',
//   //   href: '/requests',
//   //   icon: <IconRouteAltLeft size={18} />,
//   //   sub: [
//   //     {
//   //       title: 'Trucks',
//   //       label: '9',
//   //       href: '/trucks',
//   //       icon: <IconTruck size={18} />,
//   //     },
//   //     {
//   //       title: 'Cargos',
//   //       label: '',
//   //       href: '/cargos',
//   //       icon: <IconBoxSeam size={18} />,
//   //     },
//   //   ],
//   // },
//   // {
//   //   title: 'Analysis',
//   //   label: '',
//   //   href: '/analysis',
//   //   icon: <IconChartHistogram size={18} />,
//   // },
//   // {
//   //   title: 'Extra Components',
//   //   label: '',
//   //   href: '/extra-components',
//   //   icon: <IconComponents size={18} />,
//   // },
//   // {
//   //   title: 'Error Pages',
//   //   label: '',
//   //   href: '',
//   //   icon: <IconExclamationCircle size={18} />,
//   //   sub: [
//   //     {
//   //       title: 'Not Found',
//   //       label: '',
//   //       href: '/404',
//   //       icon: <IconError404 size={18} />,
//   //     },
//   //     {
//   //       title: 'Internal Server Error',
//   //       label: '',
//   //       href: '/500',
//   //       icon: <IconServerOff size={18} />,
//   //     },
//   //     {
//   //       title: 'Maintenance Error',
//   //       label: '',
//   //       href: '/503',
//   //       icon: <IconBarrierBlock size={18} />,
//   //     },
//   //     {
//   //       title: 'Unauthorised Error',
//   //       label: '',
//   //       href: '/401',
//   //       icon: <IconLock size={18} />,
//   //     },
//   //   ],
//   // },
//   {
//     title: "Users",
//     label: "",
//     href: "/users",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Astrologer's",
//     label: "",
//     href: "/astrologers",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Astrologer's Categories",
//     label: "",
//     href: "/categories",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Thoughts",
//     label: "",
//     href: "/thoughts",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Plans Management",
//     label: "",
//     href: "/plans-management",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Gem Stone Query",
//     label: "",
//     href: "/gem-stone-query",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Banner",
//     label: "",
//     href: "/banner",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Astro Services",
//     label: "",
//     href: "/astro-services",
//     icon: <BoxIcon size={18} />,
//   },
//   {
//     title: "Astrologer Request",
//     label: "",
//     href: "/astroger-request",
//     icon: <BoxIcon size={18} />,
//   },
//   // {
//   //   title: "Free Services",
//   //   label: "",
//   //   href: "/free-services",
//   //   icon: <BoxIcon size={18} />,
//   // },
//   {
//     title: "Blogs",
//     label: "",
//     href: "/blogs",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Enquiry",
//     label: "",
//     href: "/enquiry",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "Feedback",
//     label: "",
//     href: "/feedback",
//     icon: <IconUsers size={18} />,
//   },
//   {
//     title: "User Support",
//     label: "",
//     href: "/support",
//     icon: <HelpCircleIcon size={18} />,
//   },
//   // {
//   //   title: "Settings",
//   //   label: "",
//   //   href: "/settings",
//   //   icon: <IconSettings size={18} />,
//   // },
// ];


import {
  IconUsers,
  IconStar,
  IconCategory,
  IconMessageDots,
  IconCoin,
  IconCalendarStats,
  IconHelpCircle,
} from "@tabler/icons-react";

import {
  BoxIcon,
  HelpCircleIcon,
  UserCheckIcon,
  GemIcon,
  ImageIcon,
  MessageSquareHeartIcon,
  NewspaperIcon,
  MessageCircleQuestionIcon,
  Settings2Icon,
} from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Users",
    label: "",
    href: "/users",
    icon: <IconUsers size={18} />,
  },
  {
    title: "Astrologer's",
    label: "",
    href: "/astrologers",
    icon: <IconStar size={18} />,
  },
  {
    title: "Astrologer's Categories",
    label: "",
    href: "/categories",
    icon: <IconCategory size={18} />,
  },
  {
    title: "Thoughts",
    label: "",
    href: "/thoughts",
    icon: <IconMessageDots size={18} />,
  },
  {
    title: "Plans Management",
    label: "",
    href: "/plans-management",
    icon: <IconCoin size={18} />,
  },
  {
    title: "Gem Stone Query",
    label: "",
    href: "/gem-stone-query",
    icon: <GemIcon size={18} />,
  },
  {
    title: "Banner",
    label: "",
    href: "/banner",
    icon: <ImageIcon size={18} />,
  },
  {
    title: "Astro Services",
    label: "",
    href: "/astro-services",
    icon: <IconCalendarStats size={18} />,
  },
  {
    title: "Astrologer Request",
    label: "",
    href: "/astroger-request",
    icon: <UserCheckIcon size={18} />,
  },
  {
    title: "Blogs",
    label: "",
    href: "/blogs",
    icon: <NewspaperIcon size={18} />,
  },
  {
    title: "Enquiry",
    label: "",
    href: "/enquiry",
    icon: <MessageCircleQuestionIcon size={18} />,
  },
  {
    title: "Feedback",
    label: "",
    href: "/feedback",
    icon: <MessageSquareHeartIcon size={18} />,
  },
  {
    title: "User Support",
    label: "",
    href: "/support",
    icon: <HelpCircleIcon size={18} />,
  },
  // Uncomment if needed
  // {
  //   title: "Settings",
  //   label: "",
  //   href: "/settings",
  //   icon: <Settings2Icon size={18} />,
  // },
];
