import {
	Button,
	Flex,
	Heading,
	UnorderedList,
	ListItem,
	Text,
} from '@chakra-ui/react';
import firebase from 'firebase';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
	getFirebaseAdmin,
} from 'next-firebase-auth';
import React, { useEffect, useState } from 'react';
import CategoriesData from '../models/categoriesData';

function Categories() {
	const AuthUser = useAuthUser();
	const [categories, setCategories] = useState<CategoriesData[] | null>(null);

	useEffect(() => {
		if (AuthUser) {
			if (typeof AuthUser.id !== 'string') {
				throw new Error('User has no id');
			}
			firebase
				.firestore()
				.collection('categories')
				.doc(AuthUser.id)
				.get()
				.then((doc) => {
					const categoriesData: CategoriesData[] = [];

					const categories = doc.data();

					if (!categories) {
						throw new Error(
							"There's no categories data for this user"
						);
					}

					const names = categories['names'];
					if (names?.length > 0) {
						categoriesData.push({
							documentId: doc.id,
							names: names,
						});
					}

					setCategories(categoriesData);
				});
		}
	}, [AuthUser]);

	if (AuthUser) {
		const categoriesData = categories as CategoriesData[];
		const categoriesItems = categoriesData ? (
			categoriesData.map((category) => {
				return category.names.map((categoryString) => (
					<ListItem key={`${category.documentId}-${categoryString}`}>
						{categoryString}
					</ListItem>
				));
			})
		) : (
			<p>Loading categories...</p>
		);

		return (
			<Flex direction="column">
				<Heading size="xl">Hello {AuthUser.displayName}!</Heading>
				<Text textAlign="center">Categories list:</Text>
				<UnorderedList alignSelf="center">
					{categoriesItems}
				</UnorderedList>
				<Button colorScheme="blue" onClick={() => AuthUser.signOut()}>
					Log Out
				</Button>
			</Flex>
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
	const categoriesDocument = await getFirebaseAdmin()
		.firestore()
		.collection('categories')
		.doc(AuthUser.id)
		.get();

	if (!categoriesDocument.exists) {
		await getFirebaseAdmin()
			.firestore()
			.collection('categories')
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
