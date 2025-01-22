/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

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
import { Route as AuthenticatedDashboardImport } from './routes/_authenticated/_dashboard'
import { Route as AuthenticatedDashboardContentEditorImport } from './routes/_authenticated/_dashboard/content-editor'
import { Route as AuthenticatedDashboardProfileImport } from './routes/_authenticated/_dashboard/_profile'
import { Route as AuthenticatedPracticeSimulatedTestIndexImport } from './routes/_authenticated/practice/simulated-test/index'
import { Route as AuthenticatedDashboardShopIndexImport } from './routes/_authenticated/_dashboard/shop/index'
import { Route as AuthenticatedDashboardPracticeIndexImport } from './routes/_authenticated/_dashboard/practice/index'
import { Route as AuthenticatedDashboardPracticeCollectionIdIndexImport } from './routes/_authenticated/_dashboard/practice/$collectionId/index'
import { Route as AuthenticatedDashboardProfileProfileIndexImport } from './routes/_authenticated/_dashboard/_profile/profile/index'
import { Route as AuthenticatedDashboardPracticeSimulatedTestResultImport } from './routes/_authenticated/_dashboard/practice/simulated-test/result'
import { Route as AuthenticatedDashboardProfileProfileTransactionsImport } from './routes/_authenticated/_dashboard/_profile/profile/transactions'
import { Route as AuthenticatedDashboardProfileProfileHistoryImport } from './routes/_authenticated/_dashboard/_profile/profile/history'
import { Route as AuthenticatedDashboardProfileProfileChangePasswordImport } from './routes/_authenticated/_dashboard/_profile/profile/change-password'
import { Route as AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdImport } from './routes/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId'

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
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticationVerifyOtpRoute = AuthenticationVerifyOtpImport.update({
  id: '/verify-otp',
  path: '/verify-otp',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationResetPasswordRoute =
  AuthenticationResetPasswordImport.update({
    id: '/reset-password',
    path: '/reset-password',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticationLogInRoute = AuthenticationLogInImport.update({
  id: '/log-in',
  path: '/log-in',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationForgotPasswordRoute =
  AuthenticationForgotPasswordImport.update({
    id: '/forgot-password',
    path: '/forgot-password',
    getParentRoute: () => AuthenticationRoute,
  } as any)

const AuthenticatedDashboardRoute = AuthenticatedDashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedDashboardContentEditorRoute =
  AuthenticatedDashboardContentEditorImport.update({
    id: '/content-editor',
    path: '/content-editor',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedDashboardProfileRoute =
  AuthenticatedDashboardProfileImport.update({
    id: '/_profile',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedPracticeSimulatedTestIndexRoute =
  AuthenticatedPracticeSimulatedTestIndexImport.update({
    id: '/practice/simulated-test/',
    path: '/practice/simulated-test/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedDashboardShopIndexRoute =
  AuthenticatedDashboardShopIndexImport.update({
    id: '/shop/',
    path: '/shop/',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedDashboardPracticeIndexRoute =
  AuthenticatedDashboardPracticeIndexImport.update({
    id: '/practice/',
    path: '/practice/',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedDashboardPracticeCollectionIdIndexRoute =
  AuthenticatedDashboardPracticeCollectionIdIndexImport.update({
    id: '/practice/$collectionId/',
    path: '/practice/$collectionId/',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedDashboardProfileProfileIndexRoute =
  AuthenticatedDashboardProfileProfileIndexImport.update({
    id: '/profile/',
    path: '/profile/',
    getParentRoute: () => AuthenticatedDashboardProfileRoute,
  } as any)

const AuthenticatedDashboardPracticeSimulatedTestResultRoute =
  AuthenticatedDashboardPracticeSimulatedTestResultImport.update({
    id: '/practice/simulated-test/result',
    path: '/practice/simulated-test/result',
    getParentRoute: () => AuthenticatedDashboardRoute,
  } as any)

const AuthenticatedDashboardProfileProfileTransactionsRoute =
  AuthenticatedDashboardProfileProfileTransactionsImport.update({
    id: '/profile/transactions',
    path: '/profile/transactions',
    getParentRoute: () => AuthenticatedDashboardProfileRoute,
  } as any)

const AuthenticatedDashboardProfileProfileHistoryRoute =
  AuthenticatedDashboardProfileProfileHistoryImport.update({
    id: '/profile/history',
    path: '/profile/history',
    getParentRoute: () => AuthenticatedDashboardProfileRoute,
  } as any)

const AuthenticatedDashboardProfileProfileChangePasswordRoute =
  AuthenticatedDashboardProfileProfileChangePasswordImport.update({
    id: '/profile/change-password',
    path: '/profile/change-password',
    getParentRoute: () => AuthenticatedDashboardProfileRoute,
  } as any)

const AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute =
  AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdImport.update(
    {
      id: '/practice/$collectionId/simulated-test/$simulatedTestId',
      path: '/practice/$collectionId/simulated-test/$simulatedTestId',
      getParentRoute: () => AuthenticatedDashboardRoute,
    } as any,
  )

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
    '/_authenticated/_dashboard': {
      id: '/_authenticated/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedDashboardImport
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
    '/_authenticated/_dashboard/_profile': {
      id: '/_authenticated/_dashboard/_profile'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedDashboardProfileImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/_dashboard/content-editor': {
      id: '/_authenticated/_dashboard/content-editor'
      path: '/content-editor'
      fullPath: '/content-editor'
      preLoaderRoute: typeof AuthenticatedDashboardContentEditorImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/_dashboard/practice/': {
      id: '/_authenticated/_dashboard/practice/'
      path: '/practice'
      fullPath: '/practice'
      preLoaderRoute: typeof AuthenticatedDashboardPracticeIndexImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/_dashboard/shop/': {
      id: '/_authenticated/_dashboard/shop/'
      path: '/shop'
      fullPath: '/shop'
      preLoaderRoute: typeof AuthenticatedDashboardShopIndexImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/practice/simulated-test/': {
      id: '/_authenticated/practice/simulated-test/'
      path: '/practice/simulated-test'
      fullPath: '/practice/simulated-test'
      preLoaderRoute: typeof AuthenticatedPracticeSimulatedTestIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_dashboard/_profile/profile/change-password': {
      id: '/_authenticated/_dashboard/_profile/profile/change-password'
      path: '/profile/change-password'
      fullPath: '/profile/change-password'
      preLoaderRoute: typeof AuthenticatedDashboardProfileProfileChangePasswordImport
      parentRoute: typeof AuthenticatedDashboardProfileImport
    }
    '/_authenticated/_dashboard/_profile/profile/history': {
      id: '/_authenticated/_dashboard/_profile/profile/history'
      path: '/profile/history'
      fullPath: '/profile/history'
      preLoaderRoute: typeof AuthenticatedDashboardProfileProfileHistoryImport
      parentRoute: typeof AuthenticatedDashboardProfileImport
    }
    '/_authenticated/_dashboard/_profile/profile/transactions': {
      id: '/_authenticated/_dashboard/_profile/profile/transactions'
      path: '/profile/transactions'
      fullPath: '/profile/transactions'
      preLoaderRoute: typeof AuthenticatedDashboardProfileProfileTransactionsImport
      parentRoute: typeof AuthenticatedDashboardProfileImport
    }
    '/_authenticated/_dashboard/practice/simulated-test/result': {
      id: '/_authenticated/_dashboard/practice/simulated-test/result'
      path: '/practice/simulated-test/result'
      fullPath: '/practice/simulated-test/result'
      preLoaderRoute: typeof AuthenticatedDashboardPracticeSimulatedTestResultImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/_dashboard/_profile/profile/': {
      id: '/_authenticated/_dashboard/_profile/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedDashboardProfileProfileIndexImport
      parentRoute: typeof AuthenticatedDashboardProfileImport
    }
    '/_authenticated/_dashboard/practice/$collectionId/': {
      id: '/_authenticated/_dashboard/practice/$collectionId/'
      path: '/practice/$collectionId'
      fullPath: '/practice/$collectionId'
      preLoaderRoute: typeof AuthenticatedDashboardPracticeCollectionIdIndexImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
    '/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId': {
      id: '/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId'
      path: '/practice/$collectionId/simulated-test/$simulatedTestId'
      fullPath: '/practice/$collectionId/simulated-test/$simulatedTestId'
      preLoaderRoute: typeof AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdImport
      parentRoute: typeof AuthenticatedDashboardImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedDashboardProfileRouteChildren {
  AuthenticatedDashboardProfileProfileChangePasswordRoute: typeof AuthenticatedDashboardProfileProfileChangePasswordRoute
  AuthenticatedDashboardProfileProfileHistoryRoute: typeof AuthenticatedDashboardProfileProfileHistoryRoute
  AuthenticatedDashboardProfileProfileTransactionsRoute: typeof AuthenticatedDashboardProfileProfileTransactionsRoute
  AuthenticatedDashboardProfileProfileIndexRoute: typeof AuthenticatedDashboardProfileProfileIndexRoute
}

const AuthenticatedDashboardProfileRouteChildren: AuthenticatedDashboardProfileRouteChildren =
  {
    AuthenticatedDashboardProfileProfileChangePasswordRoute:
      AuthenticatedDashboardProfileProfileChangePasswordRoute,
    AuthenticatedDashboardProfileProfileHistoryRoute:
      AuthenticatedDashboardProfileProfileHistoryRoute,
    AuthenticatedDashboardProfileProfileTransactionsRoute:
      AuthenticatedDashboardProfileProfileTransactionsRoute,
    AuthenticatedDashboardProfileProfileIndexRoute:
      AuthenticatedDashboardProfileProfileIndexRoute,
  }

const AuthenticatedDashboardProfileRouteWithChildren =
  AuthenticatedDashboardProfileRoute._addFileChildren(
    AuthenticatedDashboardProfileRouteChildren,
  )

interface AuthenticatedDashboardRouteChildren {
  AuthenticatedDashboardProfileRoute: typeof AuthenticatedDashboardProfileRouteWithChildren
  AuthenticatedDashboardContentEditorRoute: typeof AuthenticatedDashboardContentEditorRoute
  AuthenticatedDashboardPracticeIndexRoute: typeof AuthenticatedDashboardPracticeIndexRoute
  AuthenticatedDashboardShopIndexRoute: typeof AuthenticatedDashboardShopIndexRoute
  AuthenticatedDashboardPracticeSimulatedTestResultRoute: typeof AuthenticatedDashboardPracticeSimulatedTestResultRoute
  AuthenticatedDashboardPracticeCollectionIdIndexRoute: typeof AuthenticatedDashboardPracticeCollectionIdIndexRoute
  AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute: typeof AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute
}

const AuthenticatedDashboardRouteChildren: AuthenticatedDashboardRouteChildren =
  {
    AuthenticatedDashboardProfileRoute:
      AuthenticatedDashboardProfileRouteWithChildren,
    AuthenticatedDashboardContentEditorRoute:
      AuthenticatedDashboardContentEditorRoute,
    AuthenticatedDashboardPracticeIndexRoute:
      AuthenticatedDashboardPracticeIndexRoute,
    AuthenticatedDashboardShopIndexRoute: AuthenticatedDashboardShopIndexRoute,
    AuthenticatedDashboardPracticeSimulatedTestResultRoute:
      AuthenticatedDashboardPracticeSimulatedTestResultRoute,
    AuthenticatedDashboardPracticeCollectionIdIndexRoute:
      AuthenticatedDashboardPracticeCollectionIdIndexRoute,
    AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute:
      AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute,
  }

const AuthenticatedDashboardRouteWithChildren =
  AuthenticatedDashboardRoute._addFileChildren(
    AuthenticatedDashboardRouteChildren,
  )

interface AuthenticatedRouteChildren {
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRouteWithChildren
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedPracticeSimulatedTestIndexRoute: typeof AuthenticatedPracticeSimulatedTestIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRouteWithChildren,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedPracticeSimulatedTestIndexRoute:
    AuthenticatedPracticeSimulatedTestIndexRoute,
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
  '': typeof AuthenticatedDashboardProfileRouteWithChildren
  '/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/log-in': typeof AuthenticationLogInRoute
  '/reset-password': typeof AuthenticationResetPasswordRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/': typeof AuthenticatedIndexRoute
  '/content-editor': typeof AuthenticatedDashboardContentEditorRoute
  '/practice': typeof AuthenticatedDashboardPracticeIndexRoute
  '/shop': typeof AuthenticatedDashboardShopIndexRoute
  '/practice/simulated-test': typeof AuthenticatedPracticeSimulatedTestIndexRoute
  '/profile/change-password': typeof AuthenticatedDashboardProfileProfileChangePasswordRoute
  '/profile/history': typeof AuthenticatedDashboardProfileProfileHistoryRoute
  '/profile/transactions': typeof AuthenticatedDashboardProfileProfileTransactionsRoute
  '/practice/simulated-test/result': typeof AuthenticatedDashboardPracticeSimulatedTestResultRoute
  '/profile': typeof AuthenticatedDashboardProfileProfileIndexRoute
  '/practice/$collectionId': typeof AuthenticatedDashboardPracticeCollectionIdIndexRoute
  '/practice/$collectionId/simulated-test/$simulatedTestId': typeof AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedDashboardProfileRouteWithChildren
  '/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/log-in': typeof AuthenticationLogInRoute
  '/reset-password': typeof AuthenticationResetPasswordRoute
  '/sign-up': typeof AuthenticationSignUpRoute
  '/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/': typeof AuthenticatedIndexRoute
  '/content-editor': typeof AuthenticatedDashboardContentEditorRoute
  '/practice': typeof AuthenticatedDashboardPracticeIndexRoute
  '/shop': typeof AuthenticatedDashboardShopIndexRoute
  '/practice/simulated-test': typeof AuthenticatedPracticeSimulatedTestIndexRoute
  '/profile/change-password': typeof AuthenticatedDashboardProfileProfileChangePasswordRoute
  '/profile/history': typeof AuthenticatedDashboardProfileProfileHistoryRoute
  '/profile/transactions': typeof AuthenticatedDashboardProfileProfileTransactionsRoute
  '/practice/simulated-test/result': typeof AuthenticatedDashboardPracticeSimulatedTestResultRoute
  '/profile': typeof AuthenticatedDashboardProfileProfileIndexRoute
  '/practice/$collectionId': typeof AuthenticatedDashboardPracticeCollectionIdIndexRoute
  '/practice/$collectionId/simulated-test/$simulatedTestId': typeof AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_authenticated/_dashboard': typeof AuthenticatedDashboardRouteWithChildren
  '/_authentication/forgot-password': typeof AuthenticationForgotPasswordRoute
  '/_authentication/log-in': typeof AuthenticationLogInRoute
  '/_authentication/reset-password': typeof AuthenticationResetPasswordRoute
  '/_authentication/sign-up': typeof AuthenticationSignUpRoute
  '/_authentication/verify-otp': typeof AuthenticationVerifyOtpRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/_dashboard/_profile': typeof AuthenticatedDashboardProfileRouteWithChildren
  '/_authenticated/_dashboard/content-editor': typeof AuthenticatedDashboardContentEditorRoute
  '/_authenticated/_dashboard/practice/': typeof AuthenticatedDashboardPracticeIndexRoute
  '/_authenticated/_dashboard/shop/': typeof AuthenticatedDashboardShopIndexRoute
  '/_authenticated/practice/simulated-test/': typeof AuthenticatedPracticeSimulatedTestIndexRoute
  '/_authenticated/_dashboard/_profile/profile/change-password': typeof AuthenticatedDashboardProfileProfileChangePasswordRoute
  '/_authenticated/_dashboard/_profile/profile/history': typeof AuthenticatedDashboardProfileProfileHistoryRoute
  '/_authenticated/_dashboard/_profile/profile/transactions': typeof AuthenticatedDashboardProfileProfileTransactionsRoute
  '/_authenticated/_dashboard/practice/simulated-test/result': typeof AuthenticatedDashboardPracticeSimulatedTestResultRoute
  '/_authenticated/_dashboard/_profile/profile/': typeof AuthenticatedDashboardProfileProfileIndexRoute
  '/_authenticated/_dashboard/practice/$collectionId/': typeof AuthenticatedDashboardPracticeCollectionIdIndexRoute
  '/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId': typeof AuthenticatedDashboardPracticeCollectionIdSimulatedTestSimulatedTestIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/forgot-password'
    | '/log-in'
    | '/reset-password'
    | '/sign-up'
    | '/verify-otp'
    | '/'
    | '/content-editor'
    | '/practice'
    | '/shop'
    | '/practice/simulated-test'
    | '/profile/change-password'
    | '/profile/history'
    | '/profile/transactions'
    | '/practice/simulated-test/result'
    | '/profile'
    | '/practice/$collectionId'
    | '/practice/$collectionId/simulated-test/$simulatedTestId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/forgot-password'
    | '/log-in'
    | '/reset-password'
    | '/sign-up'
    | '/verify-otp'
    | '/'
    | '/content-editor'
    | '/practice'
    | '/shop'
    | '/practice/simulated-test'
    | '/profile/change-password'
    | '/profile/history'
    | '/profile/transactions'
    | '/practice/simulated-test/result'
    | '/profile'
    | '/practice/$collectionId'
    | '/practice/$collectionId/simulated-test/$simulatedTestId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authentication'
    | '/_authenticated/_dashboard'
    | '/_authentication/forgot-password'
    | '/_authentication/log-in'
    | '/_authentication/reset-password'
    | '/_authentication/sign-up'
    | '/_authentication/verify-otp'
    | '/_authenticated/'
    | '/_authenticated/_dashboard/_profile'
    | '/_authenticated/_dashboard/content-editor'
    | '/_authenticated/_dashboard/practice/'
    | '/_authenticated/_dashboard/shop/'
    | '/_authenticated/practice/simulated-test/'
    | '/_authenticated/_dashboard/_profile/profile/change-password'
    | '/_authenticated/_dashboard/_profile/profile/history'
    | '/_authenticated/_dashboard/_profile/profile/transactions'
    | '/_authenticated/_dashboard/practice/simulated-test/result'
    | '/_authenticated/_dashboard/_profile/profile/'
    | '/_authenticated/_dashboard/practice/$collectionId/'
    | '/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId'
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
        "/_authenticated/_dashboard",
        "/_authenticated/",
        "/_authenticated/practice/simulated-test/"
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
    "/_authenticated/_dashboard": {
      "filePath": "_authenticated/_dashboard.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_dashboard/_profile",
        "/_authenticated/_dashboard/content-editor",
        "/_authenticated/_dashboard/practice/",
        "/_authenticated/_dashboard/shop/",
        "/_authenticated/_dashboard/practice/simulated-test/result",
        "/_authenticated/_dashboard/practice/$collectionId/",
        "/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId"
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
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_dashboard/_profile": {
      "filePath": "_authenticated/_dashboard/_profile.tsx",
      "parent": "/_authenticated/_dashboard",
      "children": [
        "/_authenticated/_dashboard/_profile/profile/change-password",
        "/_authenticated/_dashboard/_profile/profile/history",
        "/_authenticated/_dashboard/_profile/profile/transactions",
        "/_authenticated/_dashboard/_profile/profile/"
      ]
    },
    "/_authenticated/_dashboard/content-editor": {
      "filePath": "_authenticated/_dashboard/content-editor.tsx",
      "parent": "/_authenticated/_dashboard"
    },
    "/_authenticated/_dashboard/practice/": {
      "filePath": "_authenticated/_dashboard/practice/index.tsx",
      "parent": "/_authenticated/_dashboard"
    },
    "/_authenticated/_dashboard/shop/": {
      "filePath": "_authenticated/_dashboard/shop/index.tsx",
      "parent": "/_authenticated/_dashboard"
    },
    "/_authenticated/practice/simulated-test/": {
      "filePath": "_authenticated/practice/simulated-test/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_dashboard/_profile/profile/change-password": {
      "filePath": "_authenticated/_dashboard/_profile/profile/change-password.tsx",
      "parent": "/_authenticated/_dashboard/_profile"
    },
    "/_authenticated/_dashboard/_profile/profile/history": {
      "filePath": "_authenticated/_dashboard/_profile/profile/history.tsx",
      "parent": "/_authenticated/_dashboard/_profile"
    },
    "/_authenticated/_dashboard/_profile/profile/transactions": {
      "filePath": "_authenticated/_dashboard/_profile/profile/transactions.tsx",
      "parent": "/_authenticated/_dashboard/_profile"
    },
    "/_authenticated/_dashboard/practice/simulated-test/result": {
      "filePath": "_authenticated/_dashboard/practice/simulated-test/result.tsx",
      "parent": "/_authenticated/_dashboard"
    },
    "/_authenticated/_dashboard/_profile/profile/": {
      "filePath": "_authenticated/_dashboard/_profile/profile/index.tsx",
      "parent": "/_authenticated/_dashboard/_profile"
    },
    "/_authenticated/_dashboard/practice/$collectionId/": {
      "filePath": "_authenticated/_dashboard/practice/$collectionId/index.tsx",
      "parent": "/_authenticated/_dashboard"
    },
    "/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId": {
      "filePath": "_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId.tsx",
      "parent": "/_authenticated/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
