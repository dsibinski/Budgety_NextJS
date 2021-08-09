import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
} from '@chakra-ui/react';
import CategoriesData from '../models/userCategories';

type CategoriesListProps = {
	categories: CategoriesData[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
	return (
		<Table variant="simple">
			<TableCaption>Your categories</TableCaption>
			<Thead>
				<Tr>
					<Th>Category name</Th>
				</Tr>
			</Thead>
			<Tbody>{categories.map((category) => {})}</Tbody>
		</Table>
	);
};

export default CategoriesList;
