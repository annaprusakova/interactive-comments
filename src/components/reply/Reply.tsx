import { useState } from 'react';
import { ReplyType } from '../../dto/comment';
import CreatedComment from '../createdComment/CreatedComment';
import ActiveComment from '../activeComment/ActiveComment';
import { User } from '../../dto/user';
import AddReply from '../addReply/AddReply';

type ReplyProps = {
	reply: ReplyType;
	currentUser: User;
	updateReplyAfterAction: (reply: ReplyType) => void;
	onDeleteReply: (reply: ReplyType) => void;
	onUpdateMyReply: (reply: ReplyType, newContent: string) => void;
	onAddReplieToReply: (text: string, reply: ReplyType) => void;
};

export default function Reply({
	reply,
	currentUser,
	updateReplyAfterAction,
	onDeleteReply,
	onUpdateMyReply,
	onAddReplieToReply,
}: ReplyProps) {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isAddReply, setIsAddReply] = useState<boolean>(false);
	const { score, content, user, createdAt, replyingTo } = reply;
	const createdAtData =
		String(createdAt).length === 10 ? createdAt * 1000 : createdAt;

	const handleScore = (isIncrease: boolean) => {
		const updatedReply = {
			...reply,
			score: isIncrease ? ++reply.score : --reply.score,
		};
		updateReplyAfterAction(updatedReply);
	};

	const handleClickReply = () => {
		setIsAddReply(!isAddReply);
	};

	const deleteReply = () => {
		onDeleteReply(reply);
	};

	const updateReply = (newContent: string) => {
		onUpdateMyReply(reply, newContent);
		setIsEdit(false);
	};

	const handleAddReplie = (replyContent: string) => {
		onAddReplieToReply(replyContent, reply);
		setIsAddReply(false);
	};

	return (
		<>
			{isEdit ? (
				<ActiveComment
					buttonName="UPDATE"
					currentUser={currentUser}
					onClickAction={updateReply}
					text={content}
				/>
			) : (
				<CreatedComment
					isReply={true}
					score={score}
					username={user.username}
					avatar={user.image.png}
					content={content}
					createdAtData={createdAtData}
					onReply={handleClickReply}
					onScore={handleScore}
					replyingTo={replyingTo}
					onDeleteMyComment={deleteReply}
					setIsEdit={setIsEdit}
				/>
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
