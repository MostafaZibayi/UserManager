import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Box, Flex, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import type { TUsers } from "./types/user";
import UsersTable from "./table/UsersTable";
import ThemeToggleButton from "./components/ToggleThemeButton";
import DrawerEdit from "./components/DrawerEdit";

function App() {
	const [users, setUsers] = useState<TUsers>();
	const [loading, setLoading] = useState(true);
	const [editItem, setEditItem] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toast = useToast();

	const handleEditClick = (item) => {
		setEditItem(item);
		setIsDrawerOpen(true);
	};
	const handleClose = () => {
		setIsDrawerOpen(false);
		setEditItem(null);
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://jsonplaceholder.typicode.com/users"
				);
				console.log("fetchData");
				setUsers(response.data);
			} catch (error) {
				console.log(error);
				toast({
					title: String(error),
					status: "error",
					duration: 2500,
					isClosable: true,
				});
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);
	return (
		<div className="flex  w-full">
			<ThemeToggleButton />
			{isDrawerOpen && (
				<DrawerEdit
					isOpen={isDrawerOpen}
					onClose={handleClose}
					initData={editItem}
					setUsers={setUsers}
				/>
			)}
			{users ? (
				<Box>
					{users.length > 0 ? (
						<VStack>
							<UsersTable
								data={users}
								handleEditClick={handleEditClick}
							/>
						</VStack>
					) : (
						<Text fontSize="lg" mb={4}>
							شخصی یافت نشد
						</Text>
					)}
				</Box>
			) : (
				<Flex
					direction="column"
					align="center"
					justify="center"
					h="100dvh"
					w="100%"
				>
					{loading && (
						<Spinner
							size="xl"
							color="#999900"
							emptyColor="#ff6655"
						/>
					)}
				</Flex>
			)}
		</div>
	);
}

export default App;
