import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	TableCaption,
	Button,
} from '@chakra-ui/react';
import Category from '../models/category';
import { useRouter } from 'next/router';
import firebase from 'firebase';
import { useAuthUser } from 'next-firebase-auth';
import { useState } from 'react';
import { DeleteConfirmationDialog } from './DeleteConfirmationDialog';
type CategoriesListProps = {
	categories: Category[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
	const router = useRouter();
	const AuthUser = useAuthUser();
	const [deleteDialogOpened, setDeleteDialogOpened] =
		useState<boolean>(false);

	// TODO: finish showing this dialog.. https://chakra-ui.com/docs/overlay/alert-dialog
	//const onDeleteCategoryClicked

	const onDeleteCategory = async function (value: Category) {
		try {
			await firebase
				.firestore()
				.collection('users')
				.doc(AuthUser.id as string)
				.collection('categories')
				.doc(value.id)
				.delete();
		} catch (error) {
			alert('There was an error when deleting the category: ' + error);
		}

		alert(`Successfully deleted ${value.name}`);
		router.push('/categories');
	};
	return (
		<>
			<DeleteConfirmationDialog
				isOpen={deleteDialogOpened}
				title="Delete category"
				confirmationMessage="Are you sure you want to delete this category?"
				onClose={(confirmed) => {
					setDeleteDialogOpened(false);
				}}
			/>
			<Table variant="striped" width="fit-content" fontSize="xl">
				<TableCaption placement="top">Your categories</TableCaption>
				<Thead>
					<Tr>
						<Th fontSize="large" textAlign="center">
							Category name
						</Th>
						<Th fontSize="large" textAlign="center">
							Operations type
						</Th>
						<Th fontSize="large" colSpan={2}>
							Actions
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{categories.map((category) => {
						return (
							<tr key={category.id}>
								<td align="center">{category.name}</td>
								<td align="center">{category.type}</td>
								<td align="center">
									<Button
										variant="link"
										onClick={() =>
											router.push(
												`/categories/edit/${category.id}`
											)
										}
									>
										Edit
									</Button>
								</td>
								<td align="center">
									<Button
										colorScheme="red"
										size="sm"
										onClick={onDeleteCategory.bind(
											this,
											category
										)}
									>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</Tbody>
			</Table>
		</>
	);
};

export default CategoriesList;
