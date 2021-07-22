import firebase from 'firebase/app';
import 'firebase/firestore';
import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import { GetServerSideProps } from 'next';
import { useUser } from '../firebase/useUser';
import User from '../models/user';
import React, { useState, useEffect } from 'react';
import CategoriesData from '../models/categoriesData';
import initFirebase from '../firebase/firebaseClient';

type CategoriesProps = {
	sessionUser: User | null;
	categories: CategoriesData[];
};

function Categories(props: CategoriesProps) {
	const { user, logout } = useUser(props.sessionUser);

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
		initFirebase();
		let categoriesProps: CategoriesProps = {
			sessionUser: null,
			categories: [],
		};

		const cookies = nookies.get(context);
		if (!!cookies.token) {
			const token: any = await verifyIdToken(cookies.token);
			const { uid, name }: { uid: string; name: string } = token;
			const userModel: User = { name: name, id: uid };
			categoriesProps.sessionUser = userModel;

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
