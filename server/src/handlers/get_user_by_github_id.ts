
import { type GetUserByGithubIdInput, type User } from '../schema';

export declare function getUserByGithubId(input: GetUserByGithubIdInput): Promise<User | null>;
