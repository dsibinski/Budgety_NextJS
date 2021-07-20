import Layout from '../components/Layout';
import '../styles/globals.css';
import { AuthProvider } from '../firebase/authProvider';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	);
}

export default MyApp;
