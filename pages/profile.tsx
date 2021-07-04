import nookies from 'nookies';
import { verifyIdToken } from '../firebase/firebaseAdmin';
import initFirebase from '../firebase/firebaseClient';
import firebase from 'firebase/app';
import { GetServerSideProps } from 'next';

function Profile({ session }: any) {
	initFirebase();

	if (session) {
		return (
			<div>
				<div>You are authenticated!</div>
				<div>{session}</div>
				{/* <article className="prose text-center">
					<h2>{user.displayName}</h2>
					<h4>{user.email}</h4>
				</article> */}
			</div>
		);
	} else {
		return <div>You need to login first.</div>;
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		console.log(`Cookies: ${cookies}`);
		console.log(`Token: ${cookies.token}`);
		const token: any = await verifyIdToken(cookies.token);
		console.log(`Token after verification: ${token}`);
		const { uid, email }: { uid: string; email: string } = token;

		return {
			props: {
				session: `Your email address is ${email} and your UID is ${uid}`,
			},
		};
	} catch (e) {
		console.log('ERRRRRORORORO');
		console.log(e);
		// context.res.writeHead(302, { location: '/auth' });
		// context.res.end();
		return { props: {} };
	}
};

export default Profile;
