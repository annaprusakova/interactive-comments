import { User } from './user';

export type CommentType = {
	id: string;
	content: string;
	createdAt: number;
	score: number;
	user: User;
	replies: ReplyType[];
};

export interface ReplyType extends Omit<CommentType, 'replies'> {
	replyingTo: string;
}
