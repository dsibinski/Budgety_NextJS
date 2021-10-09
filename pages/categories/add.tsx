import { Flex } from '@chakra-ui/react';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/dist/client/router';
import CategoryDetails from 'components/CategoryDetails';
import Category from 'models/category';
import OperationType from 'models/operationType';
import firebase from 'firebase';

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
			await firebase
				.firestore()
				.collection('users')
				.doc(AuthUser.id as string)
				.collection('categories')
				.add(value);
		} catch (error) {
			alert('There was an error when adding new category.');
		}

		router.push('/categories');
	};

	return (
		<Flex direction="column">
			<CategoryDetails category={newCategory} onSubmit={onAddCategory} />
		</Flex>
	);
};

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Add);
