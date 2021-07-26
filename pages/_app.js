import Layout from '../components/Layout';
import '../styles/globals.css';
import initAuth from '../firebase/initAuth';
import { withAuthUser } from 'next-firebase-auth';

initAuth();

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default withAuthUser()(MyApp);
