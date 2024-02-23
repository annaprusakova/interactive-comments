import { User } from '../../dto/user';
import { CommentType } from '../../dto/comment';
import { v4 as uuidv4 } from 'uuid';
import ActiveComment from '../activeComment/ActiveComment';
import data from '../../data.json';

export default function AddComment() {
	const currentUser = data.currentUser as User;
	const handleSentMessage = (comment: string) => {
		const allComments = localStorage.getItem('comments');
		const comments: CommentType[] = allComments
			? [...JSON.parse(allComments)]
			: [];
		comments.push({
			id: uuidv4(),
			content: comment,
			createdAt: new Date().getTime(),
			score: 0,
			user: currentUser,
			replies: [],
		});
		localStorage.setItem('comments', JSON.stringify(comments));
	};

	return (
		<div className="mb-8">
			<ActiveComment
				currentUser={currentUser}
				buttonName="SEND"
				onClickAction={handleSentMessage}
			/>
		</div>
	);
}
