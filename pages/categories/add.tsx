import {
	Flex,
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
import OperationType from '../../models/operationType';
import firebase from 'firebase';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/dist/client/router';

const Add = () => {
	const router = useRouter();
	const AuthUser = useAuthUser();
	function validateName(value: string) {
		let error;
		if (!value) {
			error = 'Category name is required';
		}
		return error;
	}

	return (
		<Flex direction="column">
			<Formik
				initialValues={{ name: '', type: OperationType.Expense }}
				onSubmit={(values, actions) => {
					firebase
						.firestore()
						.collection('users')
						.doc(AuthUser.id as string)
						.collection('categories')
						.add(values)
						.then((result) => {
							actions.setSubmitting(false);
							router.push('/categories');
						});
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Field name="name" validate={validateName}>
							{({ field, form }: any) => (
								<FormControl
									isInvalid={
										form.errors.name && form.touched.name
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
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default withAuthUser({
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Add);
