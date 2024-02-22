import { User } from '../../dto/user';
import ActiveComment from '../activeComment/ActiveComment';

type AddReplyProps = {
	currentUser: User;
	onAddReplyToComment: (comment: string) => void;
};
export default function AddReply({
	currentUser,
	onAddReplyToComment,
}: AddReplyProps) {
	return (
		<ActiveComment
			buttonName="REPLY"
			currentUser={currentUser}
			onClickAction={onAddReplyToComment}
		/>
	);
}
