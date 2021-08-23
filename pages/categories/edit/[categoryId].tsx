import { useRouter } from 'next/router';

const CategoryEditView = () => {
	const router = useRouter();
	const { categoryId } = router.query;

	return <p>CategoryId: {categoryId}</p>;
};

export default CategoryEditView;
