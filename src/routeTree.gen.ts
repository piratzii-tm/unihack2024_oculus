/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const StoryIdLazyImport = createFileRoute('/story/$id')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const StoryIdLazyRoute = StoryIdLazyImport.update({
  id: '/story/$id',
  path: '/story/$id',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/story/$id.lazy').then((d) => d.Route))

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
    '/story/$id': {
      id: '/story/$id'
      path: '/story/$id'
      fullPath: '/story/$id'
      preLoaderRoute: typeof StoryIdLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/story/$id': typeof StoryIdLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/story/$id': typeof StoryIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/story/$id': typeof StoryIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/story/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/story/$id'
  id: '__root__' | '/' | '/story/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  StoryIdLazyRoute: typeof StoryIdLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  StoryIdLazyRoute: StoryIdLazyRoute,
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
        "/story/$id"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/story/$id": {
      "filePath": "story/$id.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
