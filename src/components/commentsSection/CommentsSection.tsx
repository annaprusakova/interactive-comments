import CommentsList from '../commentsList/CommentsList';
import AddComment from '../addComment/AddComment';
import { CommentProvider } from '../Comments.provider';

export default function CommentsSection() {
	return (
		<CommentProvider>
			<div className="w-[730px]">
				<CommentsList />
				<AddComment />
			</div>
		</CommentProvider>
	);
}
