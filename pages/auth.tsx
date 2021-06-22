import FirebaseAuth from '../components/Auth/FirebaseAuth';

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

export default Auth;
