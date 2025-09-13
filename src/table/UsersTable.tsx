import * as React from "react";
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Text,
	Link,
	IconButton,
	StepIcon,
} from "@chakra-ui/react";
import { uniqSorted } from "../utils/sorter";
import FilterBar from "../components/filters/FilterBar";
import type { IUser, TUsers } from "../types/user";
type Props = { data: TUsers; handleEditClick: (item: IUser) => void };
const UsersTable: React.FC<Props> = ({ data, handleEditClick }) => {
	// چک باکس های چندانتخابی
	const companyOptions = React.useMemo(
		() =>
			uniqSorted(
				data.map((u) => u.company?.name).filter(Boolean) as string[]
			),
		[data]
	);
	const cityOptions = React.useMemo(
		() =>
			uniqSorted(
				data.map((u) => u.address?.city).filter(Boolean) as string[]
			),
		[data]
	);

	// استیت های کنترلر برای سرچ
	const [name_Srch, setName_Srch] = React.useState("");
	const [email_Srch, setEmail_Srch] = React.useState("");
	const [phone_Srch, setPhone_Srch] = React.useState("");
	const [companies, setCompanies] = React.useState<string[]>([]);
	const [cities, setCities] = React.useState<string[]>([]);

	//لغو سرچ
	const reset = () => {
		setName_Srch("");
		setEmail_Srch("");
		setPhone_Srch("");
		setCompanies([]);
		setCities([]);
	};

	const filtered = React.useMemo(() => {
		return data
			.filter((u) => {
				const byName =
					!name_Srch ||
					u.name.toLowerCase().includes(name_Srch.toLowerCase());
				const byEmail =
					!email_Srch ||
					u.email.toLowerCase().includes(email_Srch.toLowerCase());
				const byPhone = !phone_Srch || u.phone.includes(phone_Srch);
				const byCompany =
					companies.length === 0 ||
					companies.includes(u.company?.name || "");
				const byCity =
					cities.length === 0 ||
					cities.includes(u.address?.city || "");
				return byName && byEmail && byPhone && byCompany && byCity;
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [data, name_Srch, email_Srch, phone_Srch, companies, cities]);

	return (
		<Box>
			<FilterBar
				nameSearch={name_Srch}
				emailSearch={email_Srch}
				phoneSearch={phone_Srch}
				companies={companies}
				cities={cities}
				companyOptions={companyOptions}
				cityOptions={cityOptions}
				onNameChange={setName_Srch}
				onEmailChange={setEmail_Srch}
				onPhoneChange={setPhone_Srch}
				onCompaniesChange={setCompanies}
				onCitiesChange={setCities}
				onReset={reset}
				resultCount={filtered.length}
			/>
			{filtered.length > 0 ? (
				<TableContainer
					borderWidth="1px"
					rounded="xl"
					overflow="visible"
				>
					<Table variant="striped" colorScheme="gray" size="md">
						<Thead>
							<Tr>
								<Th>نام</Th>
								<Th>ایمیل</Th>
								<Th>شماره تماس</Th>
								<Th>شرکت</Th>
								<Th>شهر</Th>
								<Th>ویرایش</Th>
							</Tr>
						</Thead>
						<Tbody>
							{filtered.map((item) => (
								<Tr key={item.id}>
									<Td>{item.name}</Td>
									<Td maxW="280px">
										<Text dir="ltr" noOfLines={1}>
											{item.email}
										</Text>
									</Td>
									<Td maxW="200px">
										<Text dir="ltr">{item.phone}</Text>
									</Td>
									<Td>{item.company?.name ?? "-"}</Td>
									<Td>{item.address?.city ?? "-"}</Td>
									<Td>
										<IconButton
											icon={
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													width="24"
													height="24"
												>
													<path
														d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.153 1.153 3.712 3.712 
           1.153-1.153a2.625 2.625 0 000-3.712zM19.44 8.095l-3.712-3.712-9.66 
           9.66a5.25 5.25 0 00-1.378 2.362l-.516 2.062a.75.75 0 00.91.91l2.062
           -.516a5.25 5.25 0 002.362-1.378l9.66-9.66z"
													/>
												</svg>
											}
											aria-label="ویرایش"
											size="lg"
											onClick={() => {
												handleEditClick(item);
											}}
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			) : (
				<Text>موردی پیدا نشد!</Text>
			)}
		</Box>
	);
};

export default UsersTable;
