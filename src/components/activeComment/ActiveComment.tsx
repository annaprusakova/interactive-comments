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
			className={`w-full h-[144px] ${buttonName === 'REPLY' || buttonName === 'UPDATE' ? 'mb-5' : 'mb-0'} bg-white rounded-md`}
		>
			<div className="w-full flex flex-row items-start justify-between gap-4 p-4">
				<img src={currentUser.image.png} className="w-10 h-10 rounded-full" />
				<textarea
					rows={4}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment..."
					className="w-[506px] h-[96px] resize-none p-3 rounded-md bg-white border-2 border-light-gray text-black active:border-moderate-blue focus-within:border-moderate-blue"
				/>
				<button
					className="w-24 h-12 bg-moderate-blue rounded-lg text-base font-bold hover:bg-light-grayish-blue"
					onClick={handleClick}
				>
					{buttonName}
				</button>
			</div>
		</div>
	);
}
