import CommentsList from '../commentsList/CommentsList';
import AddComment from '../addComment/AddComment';
import { CommentProvider } from '../Comments.provider';

export default function CommentsSection() {
	return (
		<CommentProvider>
			<div className="md:w-[730px] w-[375px]">
				<CommentsList />
				<AddComment />
			</div>
		</CommentProvider>
	);
}
