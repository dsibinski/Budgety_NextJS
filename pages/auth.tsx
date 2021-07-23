import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth';

const Auth = () => {
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

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
	whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
