import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import initFirebase from '../firebase/firebaseClient';
import { GetServerSideProps } from 'next';
import { useUser } from '../firebase/useUser';
import User from '../models/user';

function Categories({ sessionUser }: { sessionUser: User }) {
	initFirebase();
	const { user, logout } = useUser(sessionUser);

	if (user) {
		return (
			<div className="flex flex-col">
				<h1 className="text-2xl">Hello {user.name}!</h1>
				<p>Your list of categories will soon be here :)</p>
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
