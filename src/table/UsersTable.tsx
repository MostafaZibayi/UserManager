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
import EditIcon from "../assets/edit.svg?react";

type Props = { data: TUsers; handleEditClick: (item: IUser) => void };
const UsersTable: React.FC<Props> = ({ data, handleEditClick }) => {
	// آماده کردن گزینه ها برای انتخاب چند گزینه ای شرکت ها و سپس شهر ها
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

	// خواندن فیلترها از لوکال استورج هنگام لود کامپوننت
	const STORAGE_KEY = "users_filters";
	React.useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const f = JSON.parse(raw) as {
				name?: string;
				email?: string;
				phone?: string;
				companies?: string[];
				cities?: string[];
			};
			setName_Srch(f.name ?? "");
			setEmail_Srch(f.email ?? "");
			setPhone_Srch(f.phone ?? "");
			setCompanies(f.companies ?? []);
			setCities(f.cities ?? []);
		} catch {
			console.log("Error while reading filters from storage!");
		}
	}, []);

	// ذخیره سازی فیلترها در لوکال استورج هنگام تغییر
	React.useEffect(() => {
		const f = {
			name: name_Srch,
			email: email_Srch,
			phone: phone_Srch,
			companies,
			cities,
		};
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(f));
		} catch {
			console.log("Error while writing filters into storage!");
		}
	}, [name_Srch, email_Srch, phone_Srch, companies, cities]);

	//لغو و پاکسازی سرچ
	const reset = () => {
		setName_Srch("");
		setEmail_Srch("");
		setPhone_Srch("");
		setCompanies([]);
		setCities([]);
	};

	// فیلتر کردن داده ها بر اساس مقادیر سرچ
	// استفاده از useMemo برای بهینه سازی و جلوگیری از فیلتر شدن بی مورد
	// داده ها در هر رندر
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
			{/* نمایش جدول فقط اگر داده ای برای نمایش وجود داشته باشد*/}
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
										<Text noOfLines={1}>{item.email}</Text>
									</Td>
									<Td maxW="200px">
										<Text>{item.phone}</Text>
									</Td>
									<Td>{item.company?.name ?? "-"}</Td>
									<Td>{item.address?.city ?? "-"}</Td>
									<Td>
										<IconButton
											icon={<EditIcon />}
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
