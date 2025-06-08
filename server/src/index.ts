
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import {
  createUserInputSchema,
  getUserByGithubIdInputSchema,
  updateUserInputSchema,
  createWorkspaceInputSchema,
  getWorkspacesByUserInputSchema,
  updateWorkspaceInputSchema,
  createBlockInputSchema,
  getBlocksByWorkspaceInputSchema,
  updateBlockInputSchema,
  deleteBlockInputSchema,
  createPageInputSchema,
  getPagesByWorkspaceInputSchema,
  updatePageInputSchema,
  deletePageInputSchema
} from './schema';

// Import handlers
import { createUser } from './handlers/create_user';
import { getUserByGithubId } from './handlers/get_user_by_github_id';
import { updateUser } from './handlers/update_user';
import { createWorkspace } from './handlers/create_workspace';
import { getWorkspacesByUser } from './handlers/get_workspaces_by_user';
import { updateWorkspace } from './handlers/update_workspace';
import { createBlock } from './handlers/create_block';
import { getBlocksByWorkspace } from './handlers/get_blocks_by_workspace';
import { updateBlock } from './handlers/update_block';
import { deleteBlock } from './handlers/delete_block';
import { createPage } from './handlers/create_page';
import { getPagesByWorkspace } from './handlers/get_pages_by_workspace';
import { updatePage } from './handlers/update_page';
import { deletePage } from './handlers/delete_page';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User routes
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),

  getUserByGithubId: publicProcedure
    .input(getUserByGithubIdInputSchema)
    .query(({ input }) => getUserByGithubId(input)),

  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),

  // Workspace routes
  createWorkspace: publicProcedure
    .input(createWorkspaceInputSchema)
    .mutation(({ input }) => createWorkspace(input)),

  getWorkspacesByUser: publicProcedure
    .input(getWorkspacesByUserInputSchema)
    .query(({ input }) => getWorkspacesByUser(input)),

  updateWorkspace: publicProcedure
    .input(updateWorkspaceInputSchema)
    .mutation(({ input }) => updateWorkspace(input)),

  // Block routes
  createBlock: publicProcedure
    .input(createBlockInputSchema)
    .mutation(({ input }) => createBlock(input)),

  getBlocksByWorkspace: publicProcedure
    .input(getBlocksByWorkspaceInputSchema)
    .query(({ input }) => getBlocksByWorkspace(input)),

  updateBlock: publicProcedure
    .input(updateBlockInputSchema)
    .mutation(({ input }) => updateBlock(input)),

  deleteBlock: publicProcedure
    .input(deleteBlockInputSchema)
    .mutation(({ input }) => deleteBlock(input)),

  // Page routes
  createPage: publicProcedure
    .input(createPageInputSchema)
    .mutation(({ input }) => createPage(input)),

  getPagesByWorkspace: publicProcedure
    .input(getPagesByWorkspaceInputSchema)
    .query(({ input }) => getPagesByWorkspace(input)),

  updatePage: publicProcedure
    .input(updatePageInputSchema)
    .mutation(({ input }) => updatePage(input)),

  deletePage: publicProcedure
    .input(deletePageInputSchema)
    .mutation(({ input }) => deletePage(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
