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
		<Table variant="simple" width="fit-content" fontSize="xl">
			<TableCaption placement="top">Your categories</TableCaption>
			<Thead>
				<Tr>
					<Th fontSize="large">Category name</Th>
				</Tr>
			</Thead>
			<Tbody>
				{categories.names.map((categoryName) => {
					return (
						<tr key={categoryName}>
							<td align="center">{categoryName}</td>
						</tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default CategoriesList;
