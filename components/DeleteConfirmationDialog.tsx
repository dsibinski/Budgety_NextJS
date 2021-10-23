import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

type DeleteConfirmationDialogProps = {
	isOpen: boolean;
	title: string;
	confirmationMessage: string;
	objectToDelete: { id: string; name: string };
	onClose: (confirmed: boolean) => void;
};
export const DeleteConfirmationDialog = (
	props: DeleteConfirmationDialogProps
) => {
	const onDialogClose = (confirmed: boolean) => {
		props.onClose(confirmed);
	};
	const cancelRef = useRef();
	return (
		<>
			<AlertDialog
				isOpen={props.isOpen}
				leastDestructiveRef={cancelRef.current}
				onClose={() => onDialogClose(false)}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{props.title} ({props.objectToDelete.name})
						</AlertDialogHeader>

						<AlertDialogBody>
							{props.confirmationMessage}
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef.current}
								onClick={() => onDialogClose(false)}
							>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={() => onDialogClose(true)}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
