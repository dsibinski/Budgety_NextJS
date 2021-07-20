import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import User from '../models/user';
import { firebase } from '../firebase/firebaseClient';
import { useAuth } from '../firebase/authProvider';
import { useRouter } from 'next/router';
import { firebaseAdmin } from '../firebase/firebaseAdmin';

function Operations() {
	const { user } = useAuth();
	const router = useRouter();

	if (user) {
		return (
			<div className="flex flex-col">
				<h1 className="text-2xl">Hello {user.name}!</h1>
				<p>Your list of operations will soon be here :)</p>
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

// TODO: use for fetching data
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	try {
// 		const cookies = nookies.get(context);
// 		if (!!cookies.token) {
// 			const token: any = await firebaseAdmin
// 				.auth()
// 				.verifyIdToken(cookies.token);
// 			const { uid, name }: { uid: string; name: string } = token;

// 			return {
// 				props: {
// 					sessionUser: userModel,
// 				},
// 			};
// 		} else {
// 			context.res.writeHead(302, { location: '/auth' });
// 			context.res.end();
// 			return {
// 				props: {
// 					sessionUser: null,
// 				},
// 			};
// 		}
// 	} catch (e) {
// 		context.res.writeHead(302, { location: '/auth' });
// 		context.res.end();
// 		return {
// 			props: {
// 				sessionUser: null,
// 			},
// 		};
// 	}
// };

export default Operations;
