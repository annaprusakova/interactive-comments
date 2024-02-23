import { useCommentsContext } from '../Comments.context';
import Comment from '../comment/Comment';

export default function CommentsList() {
	const { comments } = useCommentsContext();
	return (
		<div className="mt-16">
			{comments.map((comment, index) => (
				<Comment comment={comment} key={index} />
			))}
		</div>
	);
}
