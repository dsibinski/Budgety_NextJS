import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import { Text } from '@chakra-ui/react';

const Auth = () => {
	return (
		<div>
			<div>
				<Text fontSize="xl">
					You need to log in in order to access this page
				</Text>
				<FirebaseAuth />
			</div>
		</div>
	);
};

export default withAuthUser({
	whenAuthed: AuthAction.REDIRECT_TO_APP,
	whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
	whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
