import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';

function Operations() {
	const AuthUser = useAuthUser();

	if (AuthUser) {
		return (
			<Flex direction="column">
				<Heading size="xl">Hello {AuthUser.displayName}!</Heading>
				<Text textAlign="center">
					Your list of operations will soon be here :)
				</Text>
				<Button colorScheme="blue" onClick={() => AuthUser.signOut()}>
					Log Out
				</Button>
			</Flex>
		);
	} else {
		return <p>You need to login first</p>;
	}
}

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Operations);
