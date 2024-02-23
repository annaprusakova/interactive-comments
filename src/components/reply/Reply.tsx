import { useState } from 'react';
import { ReplyType } from '../../dto/comment';
import CreatedComment from '../createdComment/CreatedComment';
import ActiveComment from '../activeComment/ActiveComment';
import data from '../../data.json';

type ReplyProps = {
	reply: ReplyType;
	updateReplyAfterAction: (reply: ReplyType) => void;
	onDeleteReply: (reply: ReplyType) => void;
	onUpdateMyReply: (reply: ReplyType, newContent: string) => void;
};
export default function Reply({
	reply,
	updateReplyAfterAction,
	onDeleteReply,
	onUpdateMyReply,
}: ReplyProps) {
	const me = data.currentUser;
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const { score, content, user, createdAt, replyingTo } = reply;
	const createdAtData =
		String(createdAt).length === 10 ? createdAt * 1000 : createdAt;

	const handleScore = (isIncrease: boolean) => {
		const updatedReply = {
			...reply,
			score: isIncrease ? reply.score++ : reply.score--,
		};
		updateReplyAfterAction(updatedReply);
	};

	const handleClickReply = () => {};

	const deleteReply = () => {
		onDeleteReply(reply);
	};

	const updateReply = (newContent: string) => {
		onUpdateMyReply(reply, newContent);
		setIsEdit(false);
	};

	return (
		<>
			{isEdit ? (
				<ActiveComment
					buttonName="UPDATE"
					currentUser={me}
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
		</>
	);
}
