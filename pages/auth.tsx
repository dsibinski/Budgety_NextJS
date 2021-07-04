import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useUser } from '../firebase/useUser';

const Auth = () => {
	const { user, logout } = useUser(null);

	if (user) {
		return <p>You are already logged in.</p>;
	}

	return (
		<div>
			<div>
				<FirebaseAuth />
				<p className="text-red-600 text-xl text-center">
					<a href="/">Go to Home page</a>
				</p>
			</div>
		</div>
	);
};

export default Auth;
