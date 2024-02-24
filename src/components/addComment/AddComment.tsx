import { CommentType } from '../../dto/comment';
import { v4 as uuidv4 } from 'uuid';
import ActiveComment from '../activeComment/ActiveComment';
import { useCommentsContext } from '../Comments.context';

export default function AddComment() {
	const { currentUser, addNewComment } = useCommentsContext();
	const handleSentMessage = (comment: string) => {
		const newComment: CommentType = {
			id: uuidv4(),
			content: comment,
			createdAt: new Date().getTime(),
			score: 0,
			user: currentUser,
			replies: [],
		};
		addNewComment(newComment);
	};

	return (
		<div className="mb-8 flex justify-center">
			<ActiveComment
				currentUser={currentUser}
				buttonName="SEND"
				onClickAction={handleSentMessage}
			/>
		</div>
	);
}
