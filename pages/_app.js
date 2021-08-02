import Layout from '../components/Layout';
import '../styles/globals.css';
import initAuth from '../firebase/initAuth';
import { withAuthUser } from 'next-firebase-auth';
import { ChakraProvider } from '@chakra-ui/react';

initAuth();

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ChakraProvider>
	);
}

export default withAuthUser()(MyApp);
