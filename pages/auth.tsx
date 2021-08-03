import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { Text } from '@chakra-ui/react';

const Auth = () => {
	return (
		<div>
			<div>
				<FirebaseAuth />
				<Text textColor="red.600" fontSize="xl" textAlign="center">
					<a href="/">Go to Home page</a>
				</Text>
			</div>
		</div>
	);
};

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
	whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
