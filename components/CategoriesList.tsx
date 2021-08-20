import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
} from '@chakra-ui/react';
import Category from '../models/category';

type CategoriesListProps = {
	categories: Category[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
	return (
		<Table variant="simple" width="fit-content" fontSize="xl">
			<TableCaption placement="top">Your categories</TableCaption>
			<Thead>
				<Tr>
					<Th fontSize="large">Category name</Th>
					<Th fontSize="large">Operations type</Th>
				</Tr>
			</Thead>
			<Tbody>
				{categories.map((category) => {
					return (
						<tr key={category.name}>
							<td align="center">{category.name}</td>
							<td align="center">{category.type}</td>
						</tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

export default CategoriesList;
