import moment from 'moment';
import data from '../../data.json';
import { useState } from 'react';
import { DeleteModal } from '../deleteModal/DeleteModal';
import Delete from '../../../public/icon-delete.svg?react';
import Edit from '../../../public/icon-edit.svg?react';
import Reply from '../../../public/icon-reply.svg?react';
import Plus from '../../../public/icon-plus.svg?react';
import Minus from '../../../public/icon-minus.svg?react';
import './createdCommet.css';

type CreatedCommentProps = {
	isReply: boolean;
	onScore: (isIncrease: boolean) => void;
	score: number;
	content: string;
	createdAtData: number;
	avatar: string;
	username: string;
	onReply: () => void;
	onDeleteMyComment: () => void;
	setIsEdit: (isEdit: boolean) => void;
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
	onDeleteMyComment,
	setIsEdit,
	onReply,
}: CreatedCommentProps) {
	const me = data.currentUser;
	const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false);

	const commentActions = (
		<div className="md:relative absolute md:bottom-0 bottom-7 md:right-0 right-5">
			{username === me.username ? (
				<div className="w-fit flex flex-row justify-end">
					<span
						className="w-[82px] flex items-center justify-end text-soft-red font-bold cursor-pointer hover-text-color-delete"
						onClick={() => setIsDeleteComment(true)}
					>
						<Delete className="mr-1" />
						Delete
					</span>
					<span
						className="w-[82px] flex items-center justify-end text-moderate-blue font-bold cursor-pointer hover-text-color-edit"
						onClick={() => setIsEdit(true)}
					>
						<Edit className="mr-1" />
						Edit
					</span>
				</div>
			) : (
				<span
					className="w-16 flex flex-row items-center text-moderate-blue font-bold cursor-pointer hover-text-color-edit"
					onClick={onReply}
				>
					<Reply className="mr-1" />
					Reply
				</span>
			)}
		</div>
	);

	return (
		<>
			<div
				className={`${isReply ? 'md:w-[642px] w-[325px]' : 'md:w-[730px] w-[343px]'} relative h-full md:p-8  p-5 rounded-md mb-5 bg-white text-black flex md:flex-row flex-col-reverse  items-start`}
			>
				<div className="md:w-[40px] md:h-[100px] w-[100px] h-[40px] p-2 md:mt-0 mt-4 flex md:flex-col flex-row justify-between items-center rounded-lg bg-very-light-gray">
					<Plus
						className="w-3 cursor-pointer hover:fill-moderate-blue"
						onClick={() => onScore(true)}
					/>
					<span className="text-moderate-blue font-bold">{score}</span>
					<Minus
						className="w-3 cursor-pointer hover:fill-moderate-blue md:mt-0 mt-2"
						onClick={() => onScore(false)}
					/>
				</div>
				<div className="w-full h-full flex flex-col md:ml-7 justify-start">
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
						{commentActions}
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
			{isDeleteComment && (
				<DeleteModal
					isOpen={isDeleteComment}
					setIsOpen={setIsDeleteComment}
					onDeleteMyComment={onDeleteMyComment}
				/>
			)}
		</>
	);
}
