import { useState } from 'react';

export default function AddComment() {
	const [comment, setComment] = useState<string>('');

	return (
		<div className="w-full h-[144px] bg-white rounded-md">
			<div className="flex flex-row items-start justify-between p-4">
				<img
					src="/avatars/image-juliusomo.png"
					className="w-10 h-10 rounded-full"
				/>
				<input
					type="text"
					multiple
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment..."
					className="w-[506px] h-[96px] rounded-md bg-white border-2 border-light-gray text-black"
				/>
				<button className="w-24 h-12 bg-moderate-blue rounded-lg text-base font-medium">
					SEND
				</button>
			</div>
		</div>
	);
}
