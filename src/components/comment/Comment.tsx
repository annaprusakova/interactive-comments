import { CommentType } from '../../dto/comment';
import moment from 'moment';

type CommentsProps = {
	comment: CommentType;
};

export default function Comment({ comment }: CommentsProps) {
	const { score, content, createdAt, user } = comment;
	return (
		<div className="w-[730px] h-full p-8 rounded-md mb-5 bg-white text-black flex flex-row items-start">
			<div className="w-20 h-[100px] p-2 flex flex-col justify-between items-center rounded-lg bg-very-light-gray">
				<img
					src={'/icon-plus.svg'}
					alt="plus"
					className="w-3 cursor-pointer hover:fill-moderate-blue"
				/>
				<span className="text-moderate-blue font-bold">{score}</span>
				<img
					src={'/icon-minus.svg'}
					alt="minus"
					className="w-3 cursor-pointer"
				/>
			</div>
			<div className="h-full flex flex-col ml-7 justify-start">
				<div className="flex flex-row items-center justify-between">
					<div className="w-[40%] flex flex-row items-center justify-between">
						<img src={user.image.png} className="w-8 h-8 rounded-full" />
						<span className="font-bold text-dark-blue">{user.username}</span>
						<span className="text-grayish-blue">
							{moment(createdAt * 1000).fromNow()}
						</span>
					</div>
					<span className="w-16 flex flex-row items-center text-moderate-blue font-bold cursor-pointer hover:text-light-grayish-blue">
						<img src={'/icon-reply.svg'} className="w-3.5 h-3 mr-1" />
						Reply
					</span>
				</div>
				<div className="mt-5 text-grayish-blue">{content}</div>
			</div>
		</div>
	);
}
