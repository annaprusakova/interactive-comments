import CommentsList from '../commentsList/CommentsList';
import AddComment from '../addComment/AddComment';

export default function Comments() {
	return (
		<div className="w-[730px] h-[896px]">
			<CommentsList />
			<AddComment />
		</div>
	);
}
