import * as React from "react";
import {
	Button,
	Stack,
	HStack,
	Text,
	Divider,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Checkbox,
	CheckboxGroup,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";

type Props = {
	label: string;
	options: string[];
	values: string[];
	onChange: (v: string[]) => void;
};

const MultiSelect: React.FC<Props> = ({ label, options, values, onChange }) => {
	const allSelected = options.length > 0 && values.length === options.length;
	const toggleAll = () => onChange(allSelected ? [] : options);

	return (
		<Popover placement="bottom-start" closeOnBlur>
			<PopoverTrigger>
				<Button size="sm" variant="outline" w="100%">
					{label}
				</Button>
			</PopoverTrigger>
			<PopoverContent w="sm">
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>
					<Stack spacing={2}>
						<HStack justify="space-between">
							<Text fontWeight="medium" fontSize="sm">
								انتخاب موارد
							</Text>
							<Button
								size="xs"
								variant="ghost"
								onClick={toggleAll}
							>
								{allSelected ? "برداشتن همه" : "انتخاب همه"}
							</Button>
						</HStack>
						<Divider />
						<CheckboxGroup
							value={values}
							onChange={(v) => onChange(v as string[])}
						>
							<Wrap spacing={3}>
								{options.map((opt) => (
									<WrapItem key={opt}>
										<Checkbox value={opt} size="sm">
											{opt}
										</Checkbox>
									</WrapItem>
								))}
							</Wrap>
						</CheckboxGroup>
					</Stack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default MultiSelect;
