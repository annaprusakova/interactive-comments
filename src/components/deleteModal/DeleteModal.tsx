import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';

type DeleteModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onDeleteMyComment: () => void;
};

export function DeleteModal({
	isOpen,
	setIsOpen,
	onDeleteMyComment,
}: DeleteModalProps) {
	const cancelButtonRef = useRef(null);
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setIsOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center md:p-8 p-2 text-center sm:items-center sm:p-0">
						<Dialog.Panel className="relative md:p-8 p-4 transform overflow-hidden rounded-lg bg-white text-left transition-all sm:my-8 sm:w-96">
							<div className="bg-white">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-start sm:ml-4 sm:mt-0">
										<Dialog.Title
											as="h3"
											className="font-semibold leading-6 text-dark-blue md:text-2xl text-md"
										>
											Delete comment
										</Dialog.Title>
										<div className="mt-5">
											<p className="md:w-full w-[288px] text-sm text-grayish-blue">
												Are you sure you want to delete this comment? This will
												remove the comment and can’t be undone.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full mt-5 md:justify-center justify-between flex flex-row-reverse items-center">
								<button
									type="button"
									className="inline-flex md:w-auto w-[138px] justify-center rounded-md bg-soft-red md:px-8 px-2 py-3 text-sm uppercase font-bold text-white sm:ml-3"
									onClick={() => {
										setIsOpen(false);
										onDeleteMyComment();
									}}
								>
									Yes, Delete
								</button>
								<button
									type="button"
									className="inline-flex md:w-auto w-[138px] justify-center rounded-md bg-grayish-blue uppercase md:px-8 px-2 py-3 text-sm font-bold sm:mt-0 sm:w-auto"
									onClick={() => setIsOpen(false)}
									ref={cancelButtonRef}
								>
									No, Cancel
								</button>
							</div>
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
