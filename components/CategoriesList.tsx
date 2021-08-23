import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Button,
} from '@chakra-ui/react';
import Category from '../models/category';
import { useRouter } from 'next/router';
type CategoriesListProps = {
	categories: Category[];
};

const CategoriesList = ({ categories }: CategoriesListProps) => {
	const router = useRouter();
	return (
		<Table variant="striped" width="fit-content" fontSize="xl">
			<TableCaption placement="top">Your categories</TableCaption>
			<Thead>
				<Tr>
					<Th fontSize="large"></Th>
					<Th fontSize="large">Category name</Th>
					<Th fontSize="large">Operations type</Th>
				</Tr>
			</Thead>
			<Tbody>
				{categories.map((category) => {
					return (
						<tr key={category.name}>
							<td align="center">
								<Button
									variant="link"
									onClick={() =>
										router.push(
											`/categories/edit/${category.id}`
										)
									}
								>
									Edit
								</Button>
							</td>
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
