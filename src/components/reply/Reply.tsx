import { ReplyType } from '../../dto/comment';
import CreatedComment from '../createdComment/CreatedComment';

type ReplyProps = {
	reply: ReplyType;
	updateReply: (reply: ReplyType) => void;
};
export default function Reply({ reply, updateReply }: ReplyProps) {
	const { score, content, user, createdAt, replyingTo } = reply;
	const createdAtData =
		String(createdAt).length === 10 ? createdAt * 1000 : createdAt;

	const handleScore = (isIncrease: boolean) => {
		const updatedReply = {
			...reply,
			score: isIncrease ? reply.score++ : reply.score--,
		};
		updateReply(updatedReply);
	};

	const handleClickReply = () => {};

	return (
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
		/>
	);
}
