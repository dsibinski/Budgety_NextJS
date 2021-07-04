import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import initFirebase from '../firebase/firebaseClient';
import { GetServerSideProps } from 'next';
import { useUser } from '../firebase/useUser';
import User from '../models/user';
import FirebaseAuth from '../components/Auth/FirebaseAuth';

function Profile({ sessionUser }: { sessionUser: User }) {
	initFirebase();
	const { user, logout } = useUser(sessionUser);

	if (user) {
		return (
			<div>
				<div>You are authenticated!</div>
				<div>{user.name}</div>
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
		console.log('checking token start');
		const cookies = nookies.get(context);
		console.log('Token:');
		console.log(cookies.token);
		if (!!cookies.token) {
			const token: any = await verifyIdToken(cookies.token);
			const { uid, email }: { uid: string; email: string } = token;
			const userModel: User = { name: email, id: uid };
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

export default Profile;
