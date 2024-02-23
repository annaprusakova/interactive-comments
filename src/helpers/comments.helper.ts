import { CommentType } from '../dto/comment';
import data from '../data.json';

const savedComments = localStorage.getItem('comments');
const comments = savedComments
	? JSON.parse(savedComments)
	: (data.comments as CommentType[]);

export const updateCommentsAfterAction = (updatedComment: CommentType) => {
	const index = comments.findIndex(
		(comment: CommentType) => comment.id === updatedComment.id,
	);
	if (index !== -1) {
		comments[index] = updatedComment;
	}
	localStorage.setItem('comments', JSON.stringify(comments));
};

export const deleteComment = (deletedComment: CommentType) => {
	const indexToRemove = comments.findIndex(
		(c: CommentType) => c.id === deletedComment.id,
	);
	if (indexToRemove !== -1) {
		comments.splice(indexToRemove, 1);
		localStorage.setItem('comments', JSON.stringify(comments));
	}
};

export const updateCommentContent = (
	updatedComment: CommentType,
	newContent: string,
) => {
	const index = comments.findIndex(
		(comment: CommentType) => comment.id === updatedComment.id,
	);
	if (index !== -1) {
		comments[index] = { ...updatedComment, content: newContent };
		localStorage.setItem('comments', JSON.stringify(comments));
	}
};
