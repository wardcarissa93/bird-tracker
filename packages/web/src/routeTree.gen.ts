/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedSearchImport } from './routes/_authenticated/search'
import { Route as AuthenticatedMyBirdsImport } from './routes/_authenticated/my-birds'
import { Route as AuthenticatedAddBirdImport } from './routes/_authenticated/add-bird'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedSearchRoute = AuthenticatedSearchImport.update({
  path: '/search',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedMyBirdsRoute = AuthenticatedMyBirdsImport.update({
  path: '/my-birds',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAddBirdRoute = AuthenticatedAddBirdImport.update({
  path: '/add-bird',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/add-bird': {
      preLoaderRoute: typeof AuthenticatedAddBirdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/my-birds': {
      preLoaderRoute: typeof AuthenticatedMyBirdsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/search': {
      preLoaderRoute: typeof AuthenticatedSearchImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedAddBirdRoute,
    AuthenticatedMyBirdsRoute,
    AuthenticatedSearchRoute,
    AuthenticatedIndexRoute,
  ]),
])

/* prettier-ignore-end */