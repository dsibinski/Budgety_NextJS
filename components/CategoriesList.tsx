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
	const [categoryToDelete, setCategoryToDelete] =
		useState<Category | null>(null);

	const onDeleteCategory = (value: Category) => {
		setCategoryToDelete(value);
		setDeleteDialogOpened(true);
	};

	const deleteCategory = async (category: Category) => {
		try {
			await firebase
				.firestore()
				.collection('users')
				.doc(AuthUser.id as string)
				.collection('categories')
				.doc(category.id)
				.delete();
		} catch (error) {
			alert('There was an error when deleting the category: ' + error);
		}

		alert(`Successfully deleted ${category.name}`);
		router.push('/categories');
	};

	return (
		<>
			{!!categoryToDelete && (
				<DeleteConfirmationDialog
					isOpen={deleteDialogOpened}
					title="Delete category"
					confirmationMessage="Are you sure you want to delete this category?"
					objectToDelete={categoryToDelete}
					onClose={(categoryToDelete, confirmed) => {
						setDeleteDialogOpened(false);

						if (confirmed === false) {
							setCategoryToDelete(null);
							return;
						}

						deleteCategory(categoryToDelete);
						setCategoryToDelete(null);
					}}
				/>
			)}
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
