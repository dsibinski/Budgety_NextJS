import CategoryDetails from 'components/CategoryDetails';
import { getApp } from 'firebase/app';
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
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
			const db = getFirestore(getApp());
			await updateDoc(
				doc(
					collection(
						doc(collection(db, 'users'), AuthUser.id as string),
						'categories'
					),
					value.id
				),
				value
			);
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
