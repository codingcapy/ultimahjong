/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'

// Create Virtual Routes

const RecordLazyImport = createFileRoute('/record')()
const DashboardLazyImport = createFileRoute('/dashboard')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const RecordLazyRoute = RecordLazyImport.update({
  id: '/record',
  path: '/record',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/record.lazy').then((d) => d.Route))

const DashboardLazyRoute = DashboardLazyImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dashboard.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLazyImport
      parentRoute: typeof rootRoute
    }
    '/record': {
      id: '/record'
      path: '/record'
      fullPath: '/record'
      preLoaderRoute: typeof RecordLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/record': typeof RecordLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/record': typeof RecordLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/register': typeof RegisterRoute
  '/about': typeof AboutLazyRoute
  '/dashboard': typeof DashboardLazyRoute
  '/record': typeof RecordLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/register' | '/about' | '/dashboard' | '/record'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/register' | '/about' | '/dashboard' | '/record'
  id: '__root__' | '/' | '/register' | '/about' | '/dashboard' | '/record'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  RegisterRoute: typeof RegisterRoute
  AboutLazyRoute: typeof AboutLazyRoute
  DashboardLazyRoute: typeof DashboardLazyRoute
  RecordLazyRoute: typeof RecordLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  RegisterRoute: RegisterRoute,
  AboutLazyRoute: AboutLazyRoute,
  DashboardLazyRoute: DashboardLazyRoute,
  RecordLazyRoute: RecordLazyRoute,
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
        "/",
        "/register",
        "/about",
        "/dashboard",
        "/record"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.lazy.tsx"
    },
    "/record": {
      "filePath": "record.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
