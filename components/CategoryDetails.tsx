import React from 'react';
import {
	Input,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	RadioGroup,
	HStack,
	Radio,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import OperationType from 'models/operationType';
import Category from 'models/category';

type CategoryDetailsProps = {
	category: Category;
	onSubmit: (value: Category) => Promise<void>;
	onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const CategoryDetails = (props: CategoryDetailsProps) => {
	const validateName = function (value: string) {
		let error;
		if (!value) {
			error = 'Category name is required';
		}
		return error;
	};

	return (
		<div>
			<Formik
				initialValues={props.category}
				onSubmit={props.onSubmit}
				enableReinitialize
			>
				{({ isSubmitting }) => (
					<Form>
						<Field name="name" validate={validateName}>
							{({ field, form }: FieldProps) => (
								<FormControl
									isInvalid={
										!!form.errors['name'] &&
										!!form.touched['name']
									}
								>
									<FormLabel htmlFor="name">
										Category name
									</FormLabel>
									<Input
										{...field}
										id="name"
										placeholder="Name"
									/>
									<FormErrorMessage>
										{form.errors.name}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="type">
							{({ field, form }: FieldProps) => {
								const { onChange, ...rest } = field;
								return (
									<FormControl
										id="type"
										isInvalid={
											!!form.errors['type'] &&
											!!form.touched['type']
										}
									>
										<FormLabel htmlFor={'type'}>
											Category type
										</FormLabel>
										<RadioGroup {...rest} id="type">
											<HStack spacing="24px">
												<Radio
													onChange={onChange}
													value={
														OperationType.Expense
													}
												>
													{OperationType.Expense}
												</Radio>
												<Radio
													onChange={onChange}
													value={OperationType.Income}
												>
													{OperationType.Income}
												</Radio>
											</HStack>
										</RadioGroup>
										<FormErrorMessage>
											{form.errors['type']}
										</FormErrorMessage>
									</FormControl>
								);
							}}
						</Field>
						<Button
							mt={4}
							colorScheme="teal"
							isLoading={isSubmitting}
							type="submit"
						>
							Save
						</Button>
						<Button
							ml={2}
							mt={4}
							colorScheme="red"
							type="button"
							onClick={props.onCancel}
						>
							Cancel
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CategoryDetails;
