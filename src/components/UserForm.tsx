// UserForm.tsx
import * as React from "react";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
	useToast,
	VStack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Button,
} from "@chakra-ui/react";
import type { IUser } from "../types/user";

type Props = {
	initData: IUser;
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
	onClose: () => void;
};

const schema = yup.object({
	name: yup.string().required("نام الزامی است").min(3, "حداقل ۳ کاراکتر"),
	email: yup
		.string()
		.email("ایمیل را صحیح وارد کنید")
		.required("ایمیل الزامی است"),
	phone: yup.number().required("شماره تماس الزامی است"),
	company: yup.string().required("نام شرکت الزامی است"),
});
type FormValues = yup.InferType<typeof schema>;

const UserForm: React.FC<Props> = ({ initData, setUsers, onClose }) => {
	const toast = useToast();

	const initialValues: FormValues = {
		name: initData.name ?? "",
		email: initData.email ?? "",
		phone: initData.phone ?? "",
		company: initData.company?.name ?? "",
	};

	const handleSubmit = async (
		values: FormValues,
		{ setSubmitting, resetForm }: FormikHelpers<FormValues>
	) => {
		try {
			const payload: IUser = {
				...initData,
				name: values.name,
				email: values.email,
				phone: values.phone,
				company: { ...initData.company, name: values.company },
			};

			await axios.put(
				`https://jsonplaceholder.typicode.com/users/${initData.id}`,
				payload,
				{
					headers: {
						"Content-Type": "application/json; charset=UTF-8",
					},
				}
			);

			setUsers((prev) =>
				prev.map((u) =>
					u.id === initData.id
						? {
								...u,
								...payload,
								company: { ...u.company, name: values.company },
						  }
						: u
				)
			);
			onClose();
			toast({
				title: "با موفقیت ویرایش شد",
				status: "success",
				duration: 2500,
				isClosable: true,
				position: "top",
			});
			resetForm({ values });
		} catch (err: any) {
			toast({
				title: "خطا در ویرایش",
				description: err?.message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
			console.error(err);
		} finally {
			setSubmitting(false);
		}
	};

	const toastErrors = (errors: Record<string, any>) => {
		Object.values(errors).forEach((msg) =>
			toast({
				title: String(msg),
				status: "error",
				duration: 2500,
				isClosable: true,
				position: "bottom-left",
			})
		);
	};

	return (
		<Formik<FormValues>
			initialValues={initialValues}
			enableReinitialize
			validationSchema={schema}
			onSubmit={handleSubmit}
			validateOnBlur
			validateOnChange
		>
			{({ errors, touched, validateForm, setTouched, isSubmitting }) => (
				<Form>
					<VStack py={4} align="stretch">
						<FormControl
							isInvalid={!!(touched.name && errors.name)}
						>
							<FormLabel>نام</FormLabel>
							<Field
								as={Input}
								name="name"
								placeholder="نام را وارد کنید"
							/>
							<FormErrorMessage>{errors.name}</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={!!(touched.email && errors.email)}
						>
							<FormLabel>ایمیل</FormLabel>
							<Field
								as={Input}
								name="email"
								type="email"
								placeholder="email@example.com"
								dir="ltr"
							/>
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={!!(touched.phone && errors.phone)}
						>
							<FormLabel>شماره تماس</FormLabel>
							<Field
								as={Input}
								name="phone"
								dir="ltr"
								placeholder="+98 912 000 0000"
							/>
							<FormErrorMessage>{errors.phone}</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={!!(touched.company && errors.company)}
						>
							<FormLabel>شرکت</FormLabel>
							<Field
								as={Input}
								name="company"
								placeholder="نام شرکت"
							/>
							<FormErrorMessage>
								{errors.company}
							</FormErrorMessage>
						</FormControl>

						<Button
							isLoading={isSubmitting}
							type="submit"
							colorScheme="purple"
							w="full"
							mt={4}
							onClick={async () => {
								const errs = await validateForm();
								if (Object.keys(errs).length) {
									setTouched({
										name: true,
										email: true,
										phone: true,
										company: true,
									});
									toastErrors(errs);
								}
							}}
						>
							ثبت تغییرات
						</Button>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default UserForm;
