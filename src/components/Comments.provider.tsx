import { ReactNode, useCallback, useEffect, useState, FC } from 'react';
import { CommentType, ReplyType } from '../dto/comment';
import data from '../data.json';
import { CommentsContext } from './Comments.context';

type Properties = {
	children: ReactNode;
};

export const CommentProvider: FC<Properties> = ({ children }) => {
	const [comments, setComments] = useState<CommentType[]>([]);
	const currentUser = data.currentUser;

	const sortComments = (commentsArray: CommentType[]) => {
		const sortedComments: CommentType[] = commentsArray.sort(
			(a: CommentType, b: CommentType) => b.score - a.score,
		);
		sortedComments.forEach((comment) => {
			comment.replies.sort((a, b) => a.createdAt - b.createdAt);
		});
		return sortedComments;
	};
	const getComments = useCallback(() => {
		const savedComments = localStorage.getItem('comments');
		const commentsFromStorage = sortComments(
			savedComments
				? JSON.parse(savedComments)
				: (data.comments as CommentType[]),
		);
		setComments(commentsFromStorage);
	}, []);

	useEffect(() => {
		getComments();
	}, [getComments]);

	const setNewData = (newComments: CommentType[]) => {
		const sortedComments = sortComments(newComments);
		localStorage.setItem('comments', JSON.stringify(sortedComments));
		setComments(sortedComments);
	};

	const updateCommentsAfterAction = (updatedComment: CommentType) => {
		const copyComments = [...comments];
		const index = copyComments.findIndex(
			(comment: CommentType) => comment.id === updatedComment.id,
		);
		if (index !== -1) {
			copyComments[index] = updatedComment;
			setNewData(copyComments);
		}
	};

	const addNewComment = (newComment: CommentType) => {
		const copyComments = [...comments, newComment];
		setNewData(copyComments);
	};

	const deleteComment = (deletedComment: CommentType) => {
		const copyComments = [...comments];
		const indexToRemove = copyComments.findIndex(
			(c: CommentType) => c.id === deletedComment.id,
		);
		if (indexToRemove !== -1) {
			copyComments.splice(indexToRemove, 1);
			setNewData(copyComments);
		}
	};

	const updateCommentContent = (
		updatedComment: CommentType,
		newContent: string,
	) => {
		const copyComments = [...comments];
		const index = copyComments.findIndex(
			(comment: CommentType) => comment.id === updatedComment.id,
		);
		if (index !== -1) {
			copyComments[index] = { ...updatedComment, content: newContent };
			setNewData(copyComments);
		}
	};

	const updateReplyAfterAction = (
		commentReplies: ReplyType[],
		updatedReply: ReplyType,
	) => {
		const newRepliesArray = [...commentReplies];
		const index = newRepliesArray.findIndex(
			(reply) => reply.id === updatedReply.id,
		);
		if (index !== -1) {
			newRepliesArray[index] = updatedReply;
		}
		return newRepliesArray;
	};

	const deleteReply = (allReplies: ReplyType[], deletedReply: ReplyType) => {
		const indexToRemove = allReplies.indexOf(deletedReply);
		if (indexToRemove !== -1) {
			allReplies.splice(indexToRemove, 1);
		}
		return allReplies;
	};

	const updateReplyContent = (
		allReplies: ReplyType[],
		updatedReply: ReplyType,
		newContent: string,
	) => {
		const index = allReplies.findIndex(
			(reply: ReplyType) => reply.id === updatedReply.id,
		);
		if (index !== -1) {
			allReplies[index] = { ...updatedReply, content: newContent };
		}
		return allReplies;
	};

	return (
		<CommentsContext.Provider
			value={{
				comments,
				currentUser,
				updateCommentsAfterAction,
				addNewComment,
				deleteComment,
				updateCommentContent,
				updateReplyAfterAction,
				deleteReply,
				updateReplyContent,
			}}
		>
			{children}
		</CommentsContext.Provider>
	);
};
