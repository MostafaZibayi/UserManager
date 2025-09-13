// DrawerEdit.tsx
import * as React from "react";
import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
} from "@chakra-ui/react";
import UserForm from "./UserForm";
import type { IUser } from "../types/user";

type DrawerEditProps = {
	isOpen: boolean;
	onClose: () => void;
	initData: IUser;
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
};

const DrawerEdit: React.FC<DrawerEditProps> = ({
	isOpen,
	onClose,
	initData,
	setUsers,
}) => {
	return (
		<Drawer isOpen={isOpen} placement="start" onClose={onClose} size="xs">
			<DrawerOverlay />
			<DrawerContent borderRadius="lg">
				<DrawerCloseButton />
				<DrawerHeader mr={8} borderBottomWidth="1px">
					ویرایش {initData?.name}
				</DrawerHeader>

				<DrawerBody>
					<UserForm
						initData={initData}
						setUsers={setUsers}
						onClose={onClose}
					/>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerEdit;
