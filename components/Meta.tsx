import Head from 'next/head';
import { FunctionComponent } from 'react';

type MetaProps = {
	title?: string;
	keywords?: string;
	description?: string;
};
const Meta: FunctionComponent<MetaProps> = (props) => {
	return (
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<meta name="keywords" content={props.keywords} />
			<meta name="description" content={props.description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{props.title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Budgety',
	keywords: 'finances management, budgeting, budgeting in travel',
	description: 'Manage your finances in an easy way',
};

export default Meta;
