import { CommentType } from '../../dto/comment';
import Comment from '../comment/Comment';

type CommentsListProps = {
	comments: CommentType[];
};
export default function CommentsList({ comments }: CommentsListProps) {
	const updateComments = (updatedComment: CommentType) => {
		const index = comments.findIndex(
			(comment) => comment.id === updatedComment.id,
		);
		if (index !== -1) {
			comments[index] = updatedComment;
		}
		localStorage.setItem('comments', JSON.stringify(comments));
	};

	return (
		<div className="mt-16">
			{comments.map((comment, index) => (
				<Comment
					comment={comment}
					updateComments={updateComments}
					key={index}
				/>
			))}
		</div>
	);
}
