import { Flex } from '@chakra-ui/react';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/dist/client/router';
import CategoryDetails from 'components/CategoryDetails';
import Category from 'models/category';
import OperationType from 'models/operationType';
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';

const Add = () => {
	const router = useRouter();
	const AuthUser = useAuthUser();
	let newCategory: Category = {
		id: '',
		name: '',
		type: OperationType.Expense,
	};

	const onAddCategory = async function (value: Category) {
		try {
			const db = getFirestore(getApp());
			await addDoc(
				collection(
					doc(collection(db, 'users'), AuthUser.id as string),
					'categories'
				),
				value
			);
		} catch (error) {
			alert('There was an error when adding new category.');
		}

		router.push('/categories');
	};

	return (
		<Flex direction="column">
			<CategoryDetails
				category={newCategory}
				onSubmit={onAddCategory}
				onCancel={() => router.push('/categories')}
			/>
		</Flex>
	);
};

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Add);
