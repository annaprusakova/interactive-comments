import { CommentType } from '../../dto/comment';
import Comment from '../comment/Comment';

type CommentsListProps = {
	comments: CommentType[];
};
export default function CommentsList({ comments }: CommentsListProps) {
	return (
		<div className="mt-16">
			{comments.map((comment, index) => (
				<Comment comment={comment} key={index} />
			))}
		</div>
	);
}
