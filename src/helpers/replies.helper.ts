import { ReplyType } from '../dto/comment';

export const updateReplyAfterAction = (
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

export const deleteReply = (
	allReplies: ReplyType[],
	deletedReply: ReplyType,
) => {
	const indexToRemove = allReplies.indexOf(deletedReply);
	if (indexToRemove !== -1) {
		allReplies.splice(indexToRemove, 1);
	}
	return allReplies;
};

export const updateReplyContent = (
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
