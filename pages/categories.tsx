import React from 'react';
import 'firebase/firestore';
import nookies from 'nookies';
import { firebaseAdmin } from '../firebase/firebaseAdmin';
import { GetServerSideProps } from 'next';
import CategoriesData from '../models/categoriesData';
import { firebase } from '../firebase/firebaseClient';
import { useAuth } from '../firebase/authProvider';
import { useRouter } from 'next/router';

type CategoriesProps = {
	categories: CategoriesData[] | null;
};

function Categories(props: CategoriesProps) {
	const { user } = useAuth();
	const router = useRouter();

	if (user) {
		const categoriesItems = props.categories ? (
			props.categories.map((category) => {
				return category.names.map((categoryString) => (
					<li key={`${category.documentId}-${categoryString}`}>
						{categoryString}
					</li>
				));
			})
		) : (
			<p>Loading categories...</p>
		);

		return (
			<div className="flex flex-col">
				<h1 className="text-2xl">Hello {user.name}!</h1>
				<p>Categories list:</p>
				<ul className="list-disc">{categoriesItems}</ul>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={async () => {
						await firebase
							.auth()
							.signOut()
							.then(() => {
								router.push('/');
							});
					}}
				>
					Log Out
				</button>
			</div>
		);
	} else {
		return <p>You need to login first</p>;
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let categoriesProps: CategoriesProps = {
		categories: [],
	};
	try {
		const cookies = nookies.get(context);
		if (!!cookies.token) {
			const token: any = await firebaseAdmin
				.auth()
				.verifyIdToken(cookies.token);
			const { uid, name }: { uid: string; name: string } = token; // TODO: use uid for data fetching authorization

			let result = await firebase
				.firestore()
				.collection('categories')
				.get();

			const categoriesData: CategoriesData[] = [];
			result.forEach((doc) => {
				const names = doc.data()['names'] as string[];
				if (names?.length > 0) {
					categoriesData.push({
						documentId: doc.id,
						names: names,
					});
				}
			});

			categoriesProps.categories = categoriesData;

			return {
				props: categoriesProps,
			};
		} else {
			context.res.writeHead(302, { location: '/auth' });
			context.res.end();
			categoriesProps.categories = null;
			return {
				props: categoriesProps,
			};
		}
	} catch (e) {
		context.res.writeHead(302, { location: '/auth' });
		context.res.end();
		categoriesProps.categories = null;
		return {
			props: categoriesProps,
		};
	}
};

export default Categories;
