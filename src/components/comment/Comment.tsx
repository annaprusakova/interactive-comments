import { useState } from 'react';
import { CommentType, ReplyType } from '../../dto/comment';
import AddReply from '../addReply/AddReply';
import data from '../../data.json';
import { v4 as uuidv4 } from 'uuid';
import CreatedComment from '../createdComment/CreatedComment';
import Reply from '../reply/Reply';

type CommentsProps = {
	comment: CommentType;
	updateComments: (comment: CommentType) => void;
};

export default function Comment({ comment, updateComments }: CommentsProps) {
	const me = data.currentUser;
	const { score, content, createdAt, user, replies } = comment;
	const createdAtData =
		String(createdAt).length === 10 ? createdAt * 1000 : createdAt;
	const [isAddReply, setIsAddReply] = useState<boolean>(false);

	const handleAddReplie = (reply: string) => {
		const newReplies = [...comment.replies];
		newReplies.push({
			id: uuidv4(),
			content: reply,
			createdAt: new Date().getTime(),
			score: 0,
			user: me,
			replyingTo: comment.user.username,
		});
		updateComments({ ...comment, replies: newReplies });
		setIsAddReply(false);
	};

	const handleScore = (isIncrease: boolean) => {
		const updatedComment = {
			...comment,
			score: isIncrease ? comment.score++ : comment.score--,
		};
		updateComments(updatedComment);
	};

	const handleClickReply = () => {
		setIsAddReply(!isAddReply);
	};

	const updateReply = (updatedReply: ReplyType) => {
		const newRepliesArray = [...comment.replies];
		const index = newRepliesArray.findIndex(
			(reply) => reply.id === updatedReply.id,
		);
		if (index !== -1) {
			newRepliesArray[index] = updatedReply;
			updateComments({ ...comment, replies: newRepliesArray });
		}
	};

	return (
		<>
			<CreatedComment
				isReply={false}
				score={score}
				username={user.username}
				avatar={user.image.png}
				content={content}
				createdAtData={createdAtData}
				onReply={handleClickReply}
				onScore={handleScore}
			/>
			{replies.length && (
				<div className="flex flex-row justify-between">
					<div className="w-[2px] ml-8 my-5 bg-light-gray" />
					<div className="mt-2 flex flex-col items-end">
						{replies.map((reply, index) => (
							<Reply reply={reply} updateReply={updateReply} key={index} />
						))}
					</div>
				</div>
			)}
			{isAddReply && (
				<AddReply currentUser={me} onAddReplyToComment={handleAddReplie} />
			)}
		</>
	);
}
