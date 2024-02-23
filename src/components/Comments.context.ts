import { createContext, useContext } from 'react';
import { CommentType, ReplyType } from '../dto/comment';
import { User } from '../dto/user';

type CommentsContextProps = {
	comments: CommentType[];
	currentUser: User;
	updateCommentsAfterAction: (comment: CommentType) => void;
	deleteComment: (comment: CommentType) => void;
	updateCommentContent: (comment: CommentType, text: string) => void;
	updateReplyAfterAction: (
		commentReplies: ReplyType[],
		reply: ReplyType,
	) => ReplyType[];
	deleteReply: (commentReplies: ReplyType[], reply: ReplyType) => ReplyType[];
	updateReplyContent: (
		commentReplies: ReplyType[],
		reply: ReplyType,
		text: string,
	) => ReplyType[];
};
const CommentsContext = createContext<CommentsContextProps | null>(null);

const useCommentsContext = () => {
	return useContext(CommentsContext) as CommentsContextProps;
};

export { CommentsContext, useCommentsContext };
