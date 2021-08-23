import {
	AuthAction,
	getFirebaseAdmin,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { useRouter } from 'next/router';
import Category from '../../../models/category';

const CategoryEditView = ({ category }: { category: Category }) => {
	const router = useRouter();

	return <p>Category name: {category.name}</p>;
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
			category: category,
		},
	};
});

export default CategoryEditView;
