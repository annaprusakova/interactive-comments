import { useState } from 'react';
import { User } from '../../dto/user';
import { CommentType } from '../../dto/comment';
import { v4 as uuidv4 } from 'uuid';

type AddCommentProps = {
	currentUser: User;
};

export default function AddComment({ currentUser }: AddCommentProps) {
	const [comment, setComment] = useState<string>('');

	const handleSentMessage = () => {
		const allComments = localStorage.getItem('comments');
		if (allComments) {
			const comments: CommentType[] = [...JSON.parse(allComments)];
			comments.push({
				id: uuidv4(),
				content: comment,
				createdAt: new Date().getTime(),
				score: 0,
				user: currentUser,
				replies: [],
			});
			localStorage.setItem('comments', JSON.stringify(comments));
		}
	};

	return (
		<div className="w-full h-[144px] bg-white rounded-md">
			<div className="flex flex-row items-start justify-between p-4">
				<img src={currentUser.image.png} className="w-10 h-10 rounded-full" />
				<input
					type="text"
					multiple
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment..."
					className="w-[506px] h-[96px] rounded-md bg-white border-2 border-light-gray text-black"
				/>
				<button
					className="w-24 h-12 bg-moderate-blue rounded-lg text-base font-bold hover:bg-light-grayish-blue"
					onClick={handleSentMessage}
				>
					SEND
				</button>
			</div>
		</div>
	);
}
