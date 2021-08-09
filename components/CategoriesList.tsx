import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
} from '@chakra-ui/react';
import UserCategories from '../models/userCategories';

type CategoriesListProps = {
	categories: UserCategories;
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
	return (
		<Table variant="simple">
			<TableCaption placement="top">Your categories</TableCaption>
			<Thead>
				<Tr>
					<Th>Category name</Th>
				</Tr>
			</Thead>
			<Tbody>
				{categories.names.map((categoryName) => {
					return (
						<tr>
							<td align="center">{categoryName}</td>
						</tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default CategoriesList;
