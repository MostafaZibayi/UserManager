import * as React from "react";
import {
	Box,
	SimpleGrid,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Text,
	Button,
} from "@chakra-ui/react";
import MultiSelect from "./MultiSelect";

type Props = {
	nameSearch: string;
	emailSearch: string;
	phoneSearch: string;
	companies: string[];
	cities: string[];
	companyOptions: string[];
	cityOptions: string[];
	onNameChange: (s: string) => void;
	onEmailChange: (s: string) => void;
	onPhoneChange: (s: string) => void;
	onCompaniesChange: (s: string[]) => void;
	onCitiesChange: (s: string[]) => void;
	onReset: () => void;
	resultCount: number;
};

const FilterBar: React.FC<Props> = ({
	nameSearch: name,
	emailSearch: email,
	phoneSearch: phone,
	companies,
	cities,
	companyOptions,
	cityOptions,
	onNameChange,
	onEmailChange,
	onPhoneChange,
	onCompaniesChange,
	onCitiesChange,
	onReset,
	resultCount,
}) => {
	return (
		<Box
			borderWidth="1px"
			rounded="xl"
			p={4}
			mb={4}
			bg="white"
			_dark={{ bg: "gray.800" }}
		>
			<SimpleGrid columns={{ base: 1, md: 5 }} spacing={3}>
				<FormControl>
					<FormLabel fontSize="sm" mb={1}>
						نام
					</FormLabel>
					<Input
						size="sm"
						variant="filled"
						placeholder="جستجوی نام"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
					/>
				</FormControl>

				<FormControl>
					<FormLabel fontSize="sm" mb={1}>
						ایمیل
					</FormLabel>
					<Input
						size="sm"
						variant="filled"
						placeholder="جستجوی ایمیل"
						dir="ltr"
						value={email}
						onChange={(e) => onEmailChange(e.target.value)}
					/>
				</FormControl>

				<FormControl>
					<FormLabel fontSize="sm" mb={1}>
						شماره تماس
					</FormLabel>
					<Input
						size="sm"
						variant="filled"
						placeholder="جستجوی شماره تماس"
						dir="ltr"
						value={phone}
						onChange={(e) => onPhoneChange(e.target.value)}
					/>
				</FormControl>

				<FormControl>
					<FormLabel fontSize="sm" mb={1}>
						شرکت
					</FormLabel>
					<MultiSelect
						label={
							companies.length
								? `انتحاب شده: ${companies.length}`
								: "همه"
						}
						options={companyOptions}
						values={companies}
						onChange={onCompaniesChange}
					/>
				</FormControl>

				<FormControl>
					<FormLabel fontSize="sm" mb={1}>
						شهر
					</FormLabel>
					<MultiSelect
						label={
							cities.length
								? `انتخاب شده: ${cities.length}`
								: "همه"
						}
						options={cityOptions}
						values={cities}
						onChange={onCitiesChange}
					/>
				</FormControl>
			</SimpleGrid>

			<HStack mt={3} justify="space-between">
				<Text fontSize="sm" color="gray.500">
					{resultCount} نتیجه
				</Text>
				<Button size="sm" variant="ghost" onClick={onReset}>
					حذف فیلتر ها
				</Button>
			</HStack>
		</Box>
	);
};

export default FilterBar;
