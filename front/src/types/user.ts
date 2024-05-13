import type { DefaultSession } from "next-auth";

export type User = {
	id: string;
} & DefaultSession;
