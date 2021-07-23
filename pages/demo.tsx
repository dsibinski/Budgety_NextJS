import React from 'react';
import {
	AuthAction,
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';

const Demo = () => {
	const AuthUser = useAuthUser();
	return (
		<div>
			<p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR({
	whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo);
