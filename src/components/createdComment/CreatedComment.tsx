import moment from 'moment';
import data from '../../data.json';

type CreatedCommentProps = {
	isReply: boolean;
	onScore: (isIncrease: boolean) => void;
	score: number;
	content: string;
	createdAtData: number;
	avatar: string;
	username: string;
	onReply: () => void;
	replyingTo?: string;
};
export default function CreatedComment({
	isReply = false,
	onScore,
	score,
	content,
	createdAtData,
	avatar,
	username,
	replyingTo,
	onReply,
}: CreatedCommentProps) {
	const me = data.currentUser;
	return (
		<div
			className={`${isReply ? 'w-[642px]' : 'w-[730px]'} h-full p-8 rounded-md mb-5 bg-white text-black flex flex-row items-start`}
		>
			<div className="w-[40px] h-[100px] p-2 flex flex-col justify-between items-center rounded-lg bg-very-light-gray">
				<img
					src={'/icon-plus.svg'}
					alt="plus"
					className="w-3 cursor-pointer hover:fill-moderate-blue"
					onClick={() => onScore(true)}
				/>
				<span className="text-moderate-blue font-bold">{score}</span>
				<img
					src={'/icon-minus.svg'}
					alt="minus"
					className="w-3 cursor-pointer"
					onClick={() => onScore(false)}
				/>
			</div>
			<div className="w-full h-full flex flex-col ml-7 justify-start">
				<div className="w-full flex flex-row items-center justify-between">
					<div className="flex flex-row items-center gap-2.5">
						<img src={avatar} className="w-8 h-8 rounded-full" />
						<div className="flex flex-row items-center gap-2.5">
							<span className="font-bold text-dark-blue">{username}</span>
							{username === me.username && (
								<div className="w-[36px] p-1 bg-moderate-blue rounded-sm text-sm text-white font-bold text-center">
									you
								</div>
							)}
						</div>
						<span className="text-grayish-blue">
							{moment(createdAtData).fromNow()}
						</span>
					</div>
					{username === me.username ? (
						<div className="w-fit flex flex-row justify-end">
							<span className="w-[82px] flex items-center justify-end text-soft-red font-bold cursor-pointer">
								<img src={'/icon-delete.svg'} className="w-3.5 h-3 mr-1" />
								Delete
							</span>
							<span className="w-[82px] flex items-center justify-end text-moderate-blue font-bold cursor-pointer">
								<img src={'/icon-edit.svg'} className="w-3.5 h-3 mr-1" />
								Edit
							</span>
						</div>
					) : (
						<span
							className="w-16 flex flex-row items-center text-moderate-blue font-bold cursor-pointer hover:text-light-grayish-blue"
							onClick={onReply}
						>
							<img src={'/icon-reply.svg'} className="w-3.5 h-3 mr-1" />
							Reply
						</span>
					)}
				</div>
				<div className="mt-5 text-grayish-blue">
					{replyingTo ? (
						<>
							<span className="font-bold text-moderate-blue">
								@{replyingTo}
							</span>
							{' ' + content}
						</>
					) : (
						content
					)}
				</div>
			</div>
		</div>
	);
}
