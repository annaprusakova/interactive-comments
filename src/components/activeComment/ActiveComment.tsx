import { useState } from 'react';
import { User } from '../../dto/user';

type ActiveCommentProps = {
	currentUser: User;
	buttonName: string;
	text?: string;
	onClickAction: (comment: string) => void;
};

export default function ActiveComment({
	currentUser,
	buttonName,
	text,
	onClickAction,
}: ActiveCommentProps) {
	const [comment, setComment] = useState<string>(text || '');

	const handleClick = () => {
		if (comment.length) {
			onClickAction(comment);
			setComment('');
		}
	};
	return (
		<div
			className={`md:w-full w-[343px] md:h-[144px] h-[189px] ${buttonName === 'REPLY' || buttonName === 'UPDATE' ? 'mb-5' : 'mb-0'} bg-white rounded-md`}
		>
			<div className="md:w-full w-[343px] md:flex grid md:flex-row md:items-start md:justify-between gap-4 p-4 grid-cols-2 grid-rows-2">
				<img
					src={currentUser.image.png}
					className="w-10 h-10 rounded-full row-start-2 col-start-1 row-end-3 col-end-2"
				/>
				<textarea
					rows={4}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment..."
					className="md:w-[506px] h-[96px] resize-none p-3 row-start-1 row-end-2 col-start-1 col-end-4 rounded-md bg-white border-2 border-light-gray text-black active:border-moderate-blue focus-within:border-moderate-blue"
				/>
				<button
					className="w-24 h-12 bg-moderate-blue row-start-2 col-start-3 rounded-lg text-base font-bold hover:bg-light-grayish-blue"
					onClick={handleClick}
				>
					{buttonName}
				</button>
			</div>
		</div>
	);
}
