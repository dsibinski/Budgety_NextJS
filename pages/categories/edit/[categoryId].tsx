import CategoryDetails from 'components/CategoryDetails';
import firebase from 'firebase';
import {
	AuthAction,
	getFirebaseAdmin,
	useAuthUser,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { useRouter } from 'next/router';
import Category from '../../../models/category';

const CategoryEditView = ({ category }: { category: Category }) => {
	const router = useRouter();
	const AuthUser = useAuthUser();
	const onSaveCategory = async function (value: Category) {
		try {
			await firebase
				.firestore()
				.collection('users')
				.doc(AuthUser.id as string)
				.collection('categories')
				.doc(value.id)
				.update(value);
		} catch (error) {
			alert('There was an error when updating the category: ' + error);
		}

		router.push('/categories');
	};

	return (
		<CategoryDetails
			category={category}
			onSubmit={onSaveCategory}
			onCancel={() => router.push('/categories')}
		/>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async (context) => {
	const user = context.AuthUser;
	const { categoryId } = context.query;

	if (typeof categoryId !== 'string') {
		throw new Error('catgoryId must be a string');
	}

	if (typeof user.id !== 'string') {
		throw new Error('User has no id');
	}

	const categoryDoc = await getFirebaseAdmin()
		.firestore()
		.collection('users')
		.doc(user.id)
		.collection('categories')
		.doc(categoryId)
		.get();

	if (categoryDoc === undefined) {
		throw new Error(`Category with id ${categoryId} not found`);
	}

	const category = categoryDoc.data() as Category;

	return {
		props: {
			category: {
				id: categoryDoc.id,
				name: category.name,
				type: category.type,
			},
		},
	};
});

export default CategoryEditView;
