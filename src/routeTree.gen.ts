/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticationVerifyOtpImport } from './routes/_authentication/verify-otp'
import { Route as AuthenticationSignUpImport } from './routes/_authentication/sign-up'
import { Route as AuthenticationResetPasswordImport } from './routes/_authentication/reset-password'
import { Route as AuthenticationLogInImport } from './routes/_authentication/log-in'
import { Route as AuthenticationForgotPasswordImport } from './routes/_authentication/forgot-password'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'

// Create/Update Routes

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticationVerifyOtpRoute = AuthenticationVerifyOtpImport.update({
  path: '/verify-otp',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationResetPasswordRoute =
  AuthenticationResetPasswordImport.update({
    path: '/reset-password',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticationLogInRoute = AuthenticationLogInImport.update({
  path: '/log-in',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationForgotPasswordRoute =
  AuthenticationForgotPasswordImport.update({
    path: '/forgot-password',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authentication/forgot-password': {
      id: '/_authentication/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof AuthenticationForgotPasswordImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/log-in': {
      id: '/_authentication/log-in'
      path: '/log-in'
      fullPath: '/log-in'
      preLoaderRoute: typeof AuthenticationLogInImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/reset-password': {
      id: '/_authentication/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof AuthenticationResetPasswordImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/sign-up': {
      id: '/_authentication/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthenticationSignUpImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/verify-otp': {
      id: '/_authentication/verify-otp'
      path: '/verify-otp'
      fullPath: '/verify-otp'
      preLoaderRoute: typeof AuthenticationVerifyOtpImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface AuthenticationRouteChildren {
  AuthenticationForgotPasswordRoute: typeof AuthenticationForgotPasswordRoute
  AuthenticationLogInRoute: typeof AuthenticationLogInRoute
  AuthenticationResetPasswordRoute: typeof AuthenticationResetPasswordRoute
  AuthenticationSignUpRoute: typeof AuthenticationSignUpRoute
  AuthenticationVerifyOtpRoute: typeof AuthenticationVerifyOtpRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationForgotPasswordRoute: AuthenticationForgotPasswordRoute,
  AuthenticationLogInRoute: AuthenticationLogInRoute,
  AuthenticationResetPasswordRoute: AuthenticationResetPasswordRoute,
  AuthenticationSignUpRoute: AuthenticationSignUpRoute,
  AuthenticationVerifyOtpRoute: AuthenticationVerifyOtpRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticationRouteWithChildren
  '/profile': typeof AuthenticatedProfileRoute
  '/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/log-in': typeof AuthenticationLogInRoute
  '/reset-password': typeof AuthenticationResetPasswordRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticationRouteWithChildren
  '/profile': typeof AuthenticatedProfileRoute
  '/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/log-in': typeof AuthenticationLogInRoute
  '/reset-password': typeof AuthenticationResetPasswordRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/': typeof AuthenticatedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_authentication/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/_authentication/log-in': typeof AuthenticationLogInRoute
  '/_authentication/reset-password': typeof AuthenticationResetPasswordRoute
  '/_authentication/sign-up': typeof AuthenticationSignUpRoute
  '/_authentication/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/profile'
    | '/forgot-password'
    | '/log-in'
    | '/reset-password'
    | '/sign-up'
    | '/verify-otp'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/profile'
    | '/forgot-password'
    | '/log-in'
    | '/reset-password'
    | '/sign-up'
    | '/verify-otp'
    | '/'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authentication'
    | '/_authenticated/profile'
    | '/_authentication/forgot-password'
    | '/_authentication/log-in'
    | '/_authentication/reset-password'
    | '/_authentication/sign-up'
    | '/_authentication/verify-otp'
    | '/_authenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AuthenticationRoute: typeof AuthenticationRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AuthenticationRoute: AuthenticationRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_authentication"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/profile",
        "/_authenticated/"
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
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
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
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
