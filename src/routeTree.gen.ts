/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SimulatedTestImport } from "./routes/_simulated-test";
import { Route as AuthenticationImport } from "./routes/_authentication";
import { Route as AuthenticatedImport } from "./routes/_authenticated";
import { Route as AuthenticatedIndexImport } from "./routes/_authenticated/index";
import { Route as SimulatedTestSimulatedTestImport } from "./routes/_simulated-test/simulated-test";
import { Route as AuthenticationVerifyOtpImport } from "./routes/_authentication/verify-otp";
import { Route as AuthenticationSignUpImport } from "./routes/_authentication/sign-up";
import { Route as AuthenticationResetPasswordImport } from "./routes/_authentication/reset-password";
import { Route as AuthenticationLogInImport } from "./routes/_authentication/log-in";
import { Route as AuthenticationForgotPasswordImport } from "./routes/_authentication/forgot-password";
import { Route as AuthenticatedProfileImport } from "./routes/_authenticated/_profile";
import { Route as AuthenticatedPracticeIndexImport } from "./routes/_authenticated/practice/index";
import { Route as AuthenticatedPracticeCollectionIdImport } from "./routes/_authenticated/practice/$collectionId";
import { Route as AuthenticatedProfileProfileIndexImport } from "./routes/_authenticated/_profile/profile/index";
import { Route as AuthenticatedProfileProfileHistoryImport } from "./routes/_authenticated/_profile/profile/history";
import { Route as AuthenticatedProfileProfileChangePasswordImport } from "./routes/_authenticated/_profile/profile/change-password";

// Create/Update Routes

const SimulatedTestRoute = SimulatedTestImport.update({
  id: "/_simulated-test",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticationRoute = AuthenticationImport.update({
  id: "/_authentication",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedRoute = AuthenticatedImport.update({
  id: "/_authenticated",
  getParentRoute: () => rootRoute,
} as any);

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const SimulatedTestSimulatedTestRoute = SimulatedTestSimulatedTestImport.update({
  id: "/simulated-test",
  path: "/simulated-test",
  getParentRoute: () => SimulatedTestRoute,
} as any);

const AuthenticationVerifyOtpRoute = AuthenticationVerifyOtpImport.update({
  id: "/verify-otp",
  path: "/verify-otp",
  getParentRoute: () => AuthenticationRoute,
} as any);

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  id: "/sign-up",
  path: "/sign-up",
  getParentRoute: () => AuthenticationRoute,
} as any);

const AuthenticationResetPasswordRoute = AuthenticationResetPasswordImport.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => AuthenticationRoute,
} as any);

const AuthenticationLogInRoute = AuthenticationLogInImport.update({
  id: "/log-in",
  path: "/log-in",
  getParentRoute: () => AuthenticationRoute,
} as any);

const AuthenticationForgotPasswordRoute = AuthenticationForgotPasswordImport.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => AuthenticationRoute,
} as any);

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  id: "/_profile",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedPracticeIndexRoute = AuthenticatedPracticeIndexImport.update({
  id: "/practice/",
  path: "/practice/",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedPracticeCollectionIdRoute = AuthenticatedPracticeCollectionIdImport.update({
  id: "/practice/$collectionId",
  path: "/practice/$collectionId",
  getParentRoute: () => AuthenticatedRoute,
} as any);

const AuthenticatedProfileProfileIndexRoute = AuthenticatedProfileProfileIndexImport.update({
  id: "/profile/",
  path: "/profile/",
  getParentRoute: () => AuthenticatedProfileRoute,
} as any);

const AuthenticatedProfileProfileHistoryRoute = AuthenticatedProfileProfileHistoryImport.update({
  id: "/profile/history",
  path: "/profile/history",
  getParentRoute: () => AuthenticatedProfileRoute,
} as any);

const AuthenticatedProfileProfileChangePasswordRoute =
  AuthenticatedProfileProfileChangePasswordImport.update({
    id: "/profile/change-password",
    path: "/profile/change-password",
    getParentRoute: () => AuthenticatedProfileRoute,
  } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authenticated": {
      id: "/_authenticated";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedImport;
      parentRoute: typeof rootRoute;
    };
    "/_authentication": {
      id: "/_authentication";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticationImport;
      parentRoute: typeof rootRoute;
    };
    "/_simulated-test": {
      id: "/_simulated-test";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof SimulatedTestImport;
      parentRoute: typeof rootRoute;
    };
    "/_authenticated/_profile": {
      id: "/_authenticated/_profile";
      path: "";
      fullPath: "";
      preLoaderRoute: typeof AuthenticatedProfileImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authentication/forgot-password": {
      id: "/_authentication/forgot-password";
      path: "/forgot-password";
      fullPath: "/forgot-password";
      preLoaderRoute: typeof AuthenticationForgotPasswordImport;
      parentRoute: typeof AuthenticationImport;
    };
    "/_authentication/log-in": {
      id: "/_authentication/log-in";
      path: "/log-in";
      fullPath: "/log-in";
      preLoaderRoute: typeof AuthenticationLogInImport;
      parentRoute: typeof AuthenticationImport;
    };
    "/_authentication/reset-password": {
      id: "/_authentication/reset-password";
      path: "/reset-password";
      fullPath: "/reset-password";
      preLoaderRoute: typeof AuthenticationResetPasswordImport;
      parentRoute: typeof AuthenticationImport;
    };
    "/_authentication/sign-up": {
      id: "/_authentication/sign-up";
      path: "/sign-up";
      fullPath: "/sign-up";
      preLoaderRoute: typeof AuthenticationSignUpImport;
      parentRoute: typeof AuthenticationImport;
    };
    "/_authentication/verify-otp": {
      id: "/_authentication/verify-otp";
      path: "/verify-otp";
      fullPath: "/verify-otp";
      preLoaderRoute: typeof AuthenticationVerifyOtpImport;
      parentRoute: typeof AuthenticationImport;
    };
    "/_simulated-test/simulated-test": {
      id: "/_simulated-test/simulated-test";
      path: "/simulated-test";
      fullPath: "/simulated-test";
      preLoaderRoute: typeof SimulatedTestSimulatedTestImport;
      parentRoute: typeof SimulatedTestImport;
    };
    "/_authenticated/": {
      id: "/_authenticated/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof AuthenticatedIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/practice/$collectionId": {
      id: "/_authenticated/practice/$collectionId";
      path: "/practice/$collectionId";
      fullPath: "/practice/$collectionId";
      preLoaderRoute: typeof AuthenticatedPracticeCollectionIdImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/practice/": {
      id: "/_authenticated/practice/";
      path: "/practice";
      fullPath: "/practice";
      preLoaderRoute: typeof AuthenticatedPracticeIndexImport;
      parentRoute: typeof AuthenticatedImport;
    };
    "/_authenticated/_profile/profile/change-password": {
      id: "/_authenticated/_profile/profile/change-password";
      path: "/profile/change-password";
      fullPath: "/profile/change-password";
      preLoaderRoute: typeof AuthenticatedProfileProfileChangePasswordImport;
      parentRoute: typeof AuthenticatedProfileImport;
    };
    "/_authenticated/_profile/profile/history": {
      id: "/_authenticated/_profile/profile/history";
      path: "/profile/history";
      fullPath: "/profile/history";
      preLoaderRoute: typeof AuthenticatedProfileProfileHistoryImport;
      parentRoute: typeof AuthenticatedProfileImport;
    };
    "/_authenticated/_profile/profile/": {
      id: "/_authenticated/_profile/profile/";
      path: "/profile";
      fullPath: "/profile";
      preLoaderRoute: typeof AuthenticatedProfileProfileIndexImport;
      parentRoute: typeof AuthenticatedProfileImport;
    };
  }
}

// Create and export the route tree

interface AuthenticatedProfileRouteChildren {
  AuthenticatedProfileProfileChangePasswordRoute: typeof AuthenticatedProfileProfileChangePasswordRoute;
  AuthenticatedProfileProfileHistoryRoute: typeof AuthenticatedProfileProfileHistoryRoute;
  AuthenticatedProfileProfileIndexRoute: typeof AuthenticatedProfileProfileIndexRoute;
}

const AuthenticatedProfileRouteChildren: AuthenticatedProfileRouteChildren = {
  AuthenticatedProfileProfileChangePasswordRoute: AuthenticatedProfileProfileChangePasswordRoute,
  AuthenticatedProfileProfileHistoryRoute: AuthenticatedProfileProfileHistoryRoute,
  AuthenticatedProfileProfileIndexRoute: AuthenticatedProfileProfileIndexRoute,
};

const AuthenticatedProfileRouteWithChildren = AuthenticatedProfileRoute._addFileChildren(
  AuthenticatedProfileRouteChildren
);

interface AuthenticatedRouteChildren {
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRouteWithChildren;
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute;
  AuthenticatedPracticeCollectionIdRoute: typeof AuthenticatedPracticeCollectionIdRoute;
  AuthenticatedPracticeIndexRoute: typeof AuthenticatedPracticeIndexRoute;
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProfileRoute: AuthenticatedProfileRouteWithChildren,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedPracticeCollectionIdRoute: AuthenticatedPracticeCollectionIdRoute,
  AuthenticatedPracticeIndexRoute: AuthenticatedPracticeIndexRoute,
};

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren
);

interface AuthenticationRouteChildren {
  AuthenticationForgotPasswordRoute: typeof AuthenticationForgotPasswordRoute;
  AuthenticationLogInRoute: typeof AuthenticationLogInRoute;
  AuthenticationResetPasswordRoute: typeof AuthenticationResetPasswordRoute;
  AuthenticationSignUpRoute: typeof AuthenticationSignUpRoute;
  AuthenticationVerifyOtpRoute: typeof AuthenticationVerifyOtpRoute;
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationForgotPasswordRoute: AuthenticationForgotPasswordRoute,
  AuthenticationLogInRoute: AuthenticationLogInRoute,
  AuthenticationResetPasswordRoute: AuthenticationResetPasswordRoute,
  AuthenticationSignUpRoute: AuthenticationSignUpRoute,
  AuthenticationVerifyOtpRoute: AuthenticationVerifyOtpRoute,
};

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren
);

interface SimulatedTestRouteChildren {
  SimulatedTestSimulatedTestRoute: typeof SimulatedTestSimulatedTestRoute;
}

const SimulatedTestRouteChildren: SimulatedTestRouteChildren = {
  SimulatedTestSimulatedTestRoute: SimulatedTestSimulatedTestRoute,
};

const SimulatedTestRouteWithChildren = SimulatedTestRoute._addFileChildren(
  SimulatedTestRouteChildren
);

export interface FileRoutesByFullPath {
  "": typeof AuthenticatedProfileRouteWithChildren;
  "/forgot-password": typeof AuthenticationForgotPasswordRoute;
  "/log-in": typeof AuthenticationLogInRoute;
  "/reset-password": typeof AuthenticationResetPasswordRoute;
  "/sign-up": typeof AuthenticationSignUpRoute;
  "/verify-otp": typeof AuthenticationVerifyOtpRoute;
  "/simulated-test": typeof SimulatedTestSimulatedTestRoute;
  "/": typeof AuthenticatedIndexRoute;
  "/practice/$collectionId": typeof AuthenticatedPracticeCollectionIdRoute;
  "/practice": typeof AuthenticatedPracticeIndexRoute;
  "/profile/change-password": typeof AuthenticatedProfileProfileChangePasswordRoute;
  "/profile/history": typeof AuthenticatedProfileProfileHistoryRoute;
  "/profile": typeof AuthenticatedProfileProfileIndexRoute;
}

export interface FileRoutesByTo {
  "": typeof AuthenticatedProfileRouteWithChildren;
  "/forgot-password": typeof AuthenticationForgotPasswordRoute;
  "/log-in": typeof AuthenticationLogInRoute;
  "/reset-password": typeof AuthenticationResetPasswordRoute;
  "/sign-up": typeof AuthenticationSignUpRoute;
  "/verify-otp": typeof AuthenticationVerifyOtpRoute;
  "/simulated-test": typeof SimulatedTestSimulatedTestRoute;
  "/": typeof AuthenticatedIndexRoute;
  "/practice/$collectionId": typeof AuthenticatedPracticeCollectionIdRoute;
  "/practice": typeof AuthenticatedPracticeIndexRoute;
  "/profile/change-password": typeof AuthenticatedProfileProfileChangePasswordRoute;
  "/profile/history": typeof AuthenticatedProfileProfileHistoryRoute;
  "/profile": typeof AuthenticatedProfileProfileIndexRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/_authenticated": typeof AuthenticatedRouteWithChildren;
  "/_authentication": typeof AuthenticationRouteWithChildren;
  "/_simulated-test": typeof SimulatedTestRouteWithChildren;
  "/_authenticated/_profile": typeof AuthenticatedProfileRouteWithChildren;
  "/_authentication/forgot-password": typeof AuthenticationForgotPasswordRoute;
  "/_authentication/log-in": typeof AuthenticationLogInRoute;
  "/_authentication/reset-password": typeof AuthenticationResetPasswordRoute;
  "/_authentication/sign-up": typeof AuthenticationSignUpRoute;
  "/_authentication/verify-otp": typeof AuthenticationVerifyOtpRoute;
  "/_simulated-test/simulated-test": typeof SimulatedTestSimulatedTestRoute;
  "/_authenticated/": typeof AuthenticatedIndexRoute;
  "/_authenticated/practice/$collectionId": typeof AuthenticatedPracticeCollectionIdRoute;
  "/_authenticated/practice/": typeof AuthenticatedPracticeIndexRoute;
  "/_authenticated/_profile/profile/change-password": typeof AuthenticatedProfileProfileChangePasswordRoute;
  "/_authenticated/_profile/profile/history": typeof AuthenticatedProfileProfileHistoryRoute;
  "/_authenticated/_profile/profile/": typeof AuthenticatedProfileProfileIndexRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | ""
    | "/forgot-password"
    | "/log-in"
    | "/reset-password"
    | "/sign-up"
    | "/verify-otp"
    | "/simulated-test"
    | "/"
    | "/practice/$collectionId"
    | "/practice"
    | "/profile/change-password"
    | "/profile/history"
    | "/profile";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | ""
    | "/forgot-password"
    | "/log-in"
    | "/reset-password"
    | "/sign-up"
    | "/verify-otp"
    | "/simulated-test"
    | "/"
    | "/practice/$collectionId"
    | "/practice"
    | "/profile/change-password"
    | "/profile/history"
    | "/profile";
  id:
    | "__root__"
    | "/_authenticated"
    | "/_authentication"
    | "/_simulated-test"
    | "/_authenticated/_profile"
    | "/_authentication/forgot-password"
    | "/_authentication/log-in"
    | "/_authentication/reset-password"
    | "/_authentication/sign-up"
    | "/_authentication/verify-otp"
    | "/_simulated-test/simulated-test"
    | "/_authenticated/"
    | "/_authenticated/practice/$collectionId"
    | "/_authenticated/practice/"
    | "/_authenticated/_profile/profile/change-password"
    | "/_authenticated/_profile/profile/history"
    | "/_authenticated/_profile/profile/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren;
  AuthenticationRoute: typeof AuthenticationRouteWithChildren;
  SimulatedTestRoute: typeof SimulatedTestRouteWithChildren;
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AuthenticationRoute: AuthenticationRouteWithChildren,
  SimulatedTestRoute: SimulatedTestRouteWithChildren,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_authentication",
        "/_simulated-test"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_profile",
        "/_authenticated/",
        "/_authenticated/practice/$collectionId",
        "/_authenticated/practice/"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/forgot-password",
        "/_authentication/log-in",
        "/_authentication/reset-password",
        "/_authentication/sign-up",
        "/_authentication/verify-otp"
      ]
    },
    "/_simulated-test": {
      "filePath": "_simulated-test.tsx",
      "children": [
        "/_simulated-test/simulated-test"
      ]
    },
    "/_authenticated/_profile": {
      "filePath": "_authenticated/_profile.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_profile/profile/change-password",
        "/_authenticated/_profile/profile/history",
        "/_authenticated/_profile/profile/"
      ]
    },
    "/_authentication/forgot-password": {
      "filePath": "_authentication/forgot-password.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/log-in": {
      "filePath": "_authentication/log-in.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/reset-password": {
      "filePath": "_authentication/reset-password.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/sign-up": {
      "filePath": "_authentication/sign-up.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/verify-otp": {
      "filePath": "_authentication/verify-otp.tsx",
      "parent": "/_authentication"
    },
    "/_simulated-test/simulated-test": {
      "filePath": "_simulated-test/simulated-test.tsx",
      "parent": "/_simulated-test"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/practice/$collectionId": {
      "filePath": "_authenticated/practice/$collectionId.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/practice/": {
      "filePath": "_authenticated/practice/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_profile/profile/change-password": {
      "filePath": "_authenticated/_profile/profile/change-password.tsx",
      "parent": "/_authenticated/_profile"
    },
    "/_authenticated/_profile/profile/history": {
      "filePath": "_authenticated/_profile/profile/history.tsx",
      "parent": "/_authenticated/_profile"
    },
    "/_authenticated/_profile/profile/": {
      "filePath": "_authenticated/_profile/profile/index.tsx",
      "parent": "/_authenticated/_profile"
    }
  }
}
ROUTE_MANIFEST_END */
