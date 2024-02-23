import { useState } from 'react';
import { CommentType, ReplyType } from '../../dto/comment';
import AddReply from '../addReply/AddReply';
import { v4 as uuidv4 } from 'uuid';
import CreatedComment from '../createdComment/CreatedComment';
import Reply from '../reply/Reply';
import ActiveComment from '../activeComment/ActiveComment';
import { useCommentsContext } from '../Comments.context';

type CommentsProps = {
	comment: CommentType;
};

export default function Comment({ comment }: CommentsProps) {
	const {
		currentUser,
		updateCommentsAfterAction,
		updateReplyAfterAction,
		deleteComment,
		deleteReply,
		updateCommentContent,
		updateReplyContent,
	} = useCommentsContext();
	const { score, content, createdAt, user, replies } = comment;
	const createdAtData =
		String(createdAt).length === 10 ? createdAt * 1000 : createdAt;
	const [isAddReply, setIsAddReply] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const handleAddReplie = (reply: string) => {
		const newReplies = [...comment.replies];
		newReplies.push({
			id: uuidv4(),
			content: reply,
			createdAt: new Date().getTime(),
			score: 0,
			user: currentUser,
			replyingTo: comment.user.username,
		});
		updateCommentsAfterAction({ ...comment, replies: newReplies });
		setIsAddReply(false);
	};

	const handleScore = (isIncrease: boolean) => {
		const updatedComment = {
			...comment,
			score: isIncrease ? ++comment.score : --comment.score,
		};
		updateCommentsAfterAction(updatedComment);
	};

	const handleClickReply = () => {
		setIsAddReply(!isAddReply);
	};

	const handleUpdateReplyAfterAction = (updatedReply: ReplyType) => {
		const newRepliesArray = updateReplyAfterAction(
			comment.replies,
			updatedReply,
		);
		updateCommentsAfterAction({ ...comment, replies: newRepliesArray });
	};

	const handleDeleteMyComment = () => {
		deleteComment(comment);
	};

	const handleDeleteMyReply = (deletedReply: ReplyType) => {
		const newArrayOfReplies = deleteReply(comment.replies, deletedReply);
		updateCommentsAfterAction({ ...comment, replies: newArrayOfReplies });
	};

	const handleUpdateComment = (newContent: string) => {
		updateCommentContent(comment, newContent);
		setIsEdit(false);
	};

	const handleUpdateMyReply = (reply: ReplyType, newContent: string) => {
		const newArrayOfReplies = updateReplyContent(
			comment.replies,
			reply,
			newContent,
		);
		updateCommentsAfterAction({ ...comment, replies: newArrayOfReplies });
	};

	return (
		<>
			{isEdit ? (
				<ActiveComment
					currentUser={currentUser}
					buttonName={'UPDATE'}
					onClickAction={handleUpdateComment}
					text={comment.content}
				/>
			) : (
				<CreatedComment
					isReply={false}
					score={score}
					username={user.username}
					avatar={user.image.png}
					content={content}
					createdAtData={createdAtData}
					onReply={handleClickReply}
					onScore={handleScore}
					onDeleteMyComment={handleDeleteMyComment}
					setIsEdit={setIsEdit}
				/>
			)}
			{replies.length && (
				<div className="flex flex-row justify-between">
					<div className="w-[2px] ml-8 my-5 bg-light-gray" />
					<div className="mt-2 flex flex-col items-end">
						{replies.map((reply, index) => (
							<Reply
								currentUser={currentUser}
								reply={reply}
								updateReplyAfterAction={handleUpdateReplyAfterAction}
								onDeleteReply={handleDeleteMyReply}
								onUpdateMyReply={handleUpdateMyReply}
								key={index}
							/>
						))}
					</div>
				</div>
			)}
			{isAddReply && (
				<AddReply
					currentUser={currentUser}
					onAddReplyToComment={handleAddReplie}
				/>
			)}
		</>
	);
}
