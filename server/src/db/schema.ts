
import { pgTable, text, integer, boolean, timestamp, jsonb, real, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enum for block types
export const blockTypeEnum = pgEnum('block_type', [
  'text',
  'heading',
  'todo',
  'bullet_list',
  'numbered_list',
  'code',
  'quote',
  'divider',
  'image',
  'link',
  'table'
]);

// Users table
export const usersTable = pgTable('users', {
  id: text('id').primaryKey().$defaultFn((): string => crypto.randomUUID()),
  github_id: integer('github_id').notNull().unique(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  avatar_url: text('avatar_url').notNull(),
  display_name: text('display_name'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Workspaces table
export const workspacesTable = pgTable('workspaces', {
  id: text('id').primaryKey().$defaultFn((): string => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  owner_id: text('owner_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  is_personal: boolean('is_personal').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Blocks table - use text reference instead of direct table reference for self-referencing FK
export const blocksTable = pgTable('blocks', {
  id: text('id').primaryKey().$defaultFn((): string => crypto.randomUUID()),
  workspace_id: text('workspace_id').notNull().references(() => workspacesTable.id, { onDelete: 'cascade' }),
  parent_id: text('parent_id'), // Remove self-reference here, handle in relations
  type: blockTypeEnum('type').notNull(),
  content: jsonb('content').notNull(),
  position: real('position').notNull().default(0),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Pages table
export const pagesTable = pgTable('pages', {
  id: text('id').primaryKey().$defaultFn((): string => crypto.randomUUID()),
  workspace_id: text('workspace_id').notNull().references(() => workspacesTable.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  is_published: boolean('is_published').notNull().default(false),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  workspaces: many(workspacesTable)
}));

export const workspacesRelations = relations(workspacesTable, ({ one, many }) => ({
  owner: one(usersTable, {
    fields: [workspacesTable.owner_id],
    references: [usersTable.id]
  }),
  blocks: many(blocksTable),
  pages: many(pagesTable)
}));

export const blocksRelations = relations(blocksTable, ({ one, many }) => ({
  workspace: one(workspacesTable, {
    fields: [blocksTable.workspace_id],
    references: [workspacesTable.id]
  }),
  parent: one(blocksTable, {
    fields: [blocksTable.parent_id],
    references: [blocksTable.id],
    relationName: 'parent_child'
  }),
  children: many(blocksTable, {
    relationName: 'parent_child'
  })
}));

export const pagesRelations = relations(pagesTable, ({ one }) => ({
  workspace: one(workspacesTable, {
    fields: [pagesTable.workspace_id],
    references: [workspacesTable.id]
  })
}));

// Export all tables for relation queries
export const tables = {
  users: usersTable,
  workspaces: workspacesTable,
  blocks: blocksTable,
  pages: pagesTable
};
