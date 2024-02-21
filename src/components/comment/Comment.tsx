type CommentsProps = {
	content: string;
	createdAt: number;
	score: number;
	user: {
		img: string;
		username: string;
	};
	replies: string[];
};

export default function Comment({
	content,
	createdAt,
	score,
	user,
}: CommentsProps) {
	return (
		<div className="w-[730px] h-[167px] bg-white">
			<div>{score}</div>
			<div>
				<div>
					<img src={user.img} className="w-10 h-10 rounded-full" />
					<div>{user.username}</div>
					<div>{createdAt}</div>
				</div>
				<div>{content}</div>
			</div>
		</div>
	);
}
