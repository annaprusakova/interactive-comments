import CommentsList from '../commentsList/CommentsList';
import AddComment from '../addComment/AddComment';
import { CommentType } from '../../dto/comment';
import { useEffect, useState } from 'react';
import data from '../../data.json';

export default function Comments() {
	const me = data.currentUser;
	const [allComments, setAllComments] = useState<CommentType[]>([]);

	useEffect(() => {
		const savedComments = localStorage.getItem('comments');
		if (savedComments) {
			setAllComments(JSON.parse(savedComments));
		} else {
			setAllComments(data.comments as CommentType[]);
			localStorage.setItem('comments', JSON.stringify(data.comments));
		}
	}, []);

	return (
		<div className="w-[730px]">
			<CommentsList comments={allComments} />
			<AddComment currentUser={me} />
		</div>
	);
}
