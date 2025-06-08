
import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.string(),
  github_id: z.number(),
  username: z.string(),
  email: z.string().email(),
  avatar_url: z.string().url(),
  display_name: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Workspace schema
export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  owner_id: z.string(),
  is_personal: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Workspace = z.infer<typeof workspaceSchema>;

// Block type enum
export const blockTypeSchema = z.enum([
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

export type BlockType = z.infer<typeof blockTypeSchema>;

// Block schema
export const blockSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  parent_id: z.string().nullable(),
  type: blockTypeSchema,
  content: z.record(z.any()), // JSON content for flexibility
  position: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Block = z.infer<typeof blockSchema>;

// Page schema
export const pageSchema = z.object({
  id: z.string(),
  workspace_id: z.string(),
  title: z.string(),
  slug: z.string(),
  is_published: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Page = z.infer<typeof pageSchema>;

// Input schemas
export const createUserInputSchema = z.object({
  github_id: z.number(),
  username: z.string(),
  email: z.string().email(),
  avatar_url: z.string().url(),
  display_name: z.string().nullable().optional()
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  avatar_url: z.string().url().optional(),
  display_name: z.string().nullable().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

export const createWorkspaceInputSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  owner_id: z.string(),
  is_personal: z.boolean().optional()
});

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceInputSchema>;

export const updateWorkspaceInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().nullable().optional()
});

export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceInputSchema>;

export const createBlockInputSchema = z.object({
  workspace_id: z.string(),
  parent_id: z.string().nullable().optional(),
  type: blockTypeSchema,
  content: z.record(z.any()),
  position: z.number().optional()
});

export type CreateBlockInput = z.infer<typeof createBlockInputSchema>;

export const updateBlockInputSchema = z.object({
  id: z.string(),
  parent_id: z.string().nullable().optional(),
  type: blockTypeSchema.optional(),
  content: z.record(z.any()).optional(),
  position: z.number().optional()
});

export type UpdateBlockInput = z.infer<typeof updateBlockInputSchema>;

export const createPageInputSchema = z.object({
  workspace_id: z.string(),
  title: z.string(),
  slug: z.string().optional(),
  is_published: z.boolean().optional()
});

export type CreatePageInput = z.infer<typeof createPageInputSchema>;

export const updatePageInputSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  slug: z.string().optional(),
  is_published: z.boolean().optional()
});

export type UpdatePageInput = z.infer<typeof updatePageInputSchema>;

// Query schemas
export const getUserByGithubIdInputSchema = z.object({
  github_id: z.number()
});

export type GetUserByGithubIdInput = z.infer<typeof getUserByGithubIdInputSchema>;

export const getWorkspacesByUserInputSchema = z.object({
  user_id: z.string()
});

export type GetWorkspacesByUserInput = z.infer<typeof getWorkspacesByUserInputSchema>;

export const getBlocksByWorkspaceInputSchema = z.object({
  workspace_id: z.string(),
  parent_id: z.string().nullable().optional()
});

export type GetBlocksByWorkspaceInput = z.infer<typeof getBlocksByWorkspaceInputSchema>;

export const getPagesByWorkspaceInputSchema = z.object({
  workspace_id: z.string()
});

export type GetPagesByWorkspaceInput = z.infer<typeof getPagesByWorkspaceInputSchema>;

export const deleteBlockInputSchema = z.object({
  id: z.string()
});

export type DeleteBlockInput = z.infer<typeof deleteBlockInputSchema>;

export const deletePageInputSchema = z.object({
  id: z.string()
});

export type DeletePageInput = z.infer<typeof deletePageInputSchema>;
