import firebase from 'firebase/app';
import 'firebase/firestore';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import { GetServerSideProps } from 'next';
import { useUser } from '../firebase/useUser';
import User from '../models/user';
import React, { useState, useEffect } from 'react';
import CategoriesCollection from '../models/categoriesCollection';

function Categories({ sessionUser }: { sessionUser: User }) {
	const { user, logout } = useUser(sessionUser);
	const [categories, setCategories] = useState<any>();
	useEffect(() => {
		firebase
			.firestore()
			.collection('categories')
			.get()
			.then((res) => {
				setCategories(res);
			});
	}, []);

	if (user) {
		const categoriesItems = categories ? (
			categories.docs.map((doc: any) =>
				(doc.data() as CategoriesCollection).names.map(
					(categoryName) => {
						<li key={doc.id + categoryName}>categoryName</li>;
					}
				)
			)
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
					onClick={() => logout()}
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
	try {
		const cookies = nookies.get(context);
		if (!!cookies.token) {
			const token: any = await verifyIdToken(cookies.token);
			const { uid, name }: { uid: string; name: string } = token;
			const userModel: User = { name: name, id: uid };
			return {
				props: {
					sessionUser: userModel,
				},
			};
		} else {
			context.res.writeHead(302, { location: '/auth' });
			context.res.end();
			return {
				props: {
					sessionUser: null,
				},
			};
		}
	} catch (e) {
		context.res.writeHead(302, { location: '/auth' });
		context.res.end();
		return {
			props: {
				sessionUser: null,
			},
		};
	}
};

export default Categories;
