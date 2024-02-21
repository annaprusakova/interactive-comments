import { User } from './user';

export type CommentType = {
	id: string;
	content: string;
	createdAt: number;
	score: number;
	user: User;
	replies: Replies[];
};

export interface Replies extends CommentType {
	replyingTo: string;
}
