import { Flex, Spinner, Button, Center } from '@chakra-ui/react';
import { getApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	getFirebaseAdmin,
} from 'next-firebase-auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CategoriesList from '../../components/CategoriesList';
import Category from '../../models/category';

function Categories() {
	const AuthUser = useAuthUser();
	const [categories, setCategories] = useState<Category[] | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (AuthUser && !!AuthUser.id) {
			if (typeof AuthUser.id !== 'string') {
				throw new Error('User has no id');
			}
			const db = getFirestore(getApp());
			getDocs(
				collection(
					doc(collection(db, 'users'), AuthUser.id),
					'categories'
				)
			).then((categoriesData) => {
				let userCategoriesData: Category[] | null = null;

				const categoriesDocs = categoriesData.docs;

				if (!categoriesDocs) {
					throw new Error("There's no categories data for this user");
				}

				userCategoriesData = categoriesDocs.map((catDoc) => {
					const docData = catDoc.data();
					const categoryObj: Category = {
						id: catDoc.id,
						name: docData.name,
						type: docData.type,
					};

					return categoryObj;
				});

				setCategories(userCategoriesData);
			});
		}
	}, [AuthUser]);

	if (AuthUser && !!AuthUser.id) {
		return categories ? (
			<Flex direction="column" width="full">
				<Button
					colorScheme="blue"
					alignSelf="start"
					onClick={() => router.push('/categories/add')}
				>
					Add new category
				</Button>
				<Center>
					<CategoriesList categories={categories} />
				</Center>
			</Flex>
		) : (
			<Spinner />
		);
	} else {
		return <p>You need to login first</p>;
	}
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
	const token = await AuthUser.getIdToken(); // TODO: use token to be sent to firebase for validation
	if (typeof AuthUser.id !== 'string') {
		throw new Error('User has no id');
	}
	const userCategoriesDocument = await getFirebaseAdmin()
		.firestore()
		.collection('users')
		.doc(AuthUser.id)
		.get();

	if (!userCategoriesDocument.exists) {
		await getFirebaseAdmin()
			.firestore()
			.collection('users')
			.doc(AuthUser.id)
			.set({});
	}

	return {
		props: {},
	};
});

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Categories);
