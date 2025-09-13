import { Button, useColorMode } from "@chakra-ui/react";

function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			onClick={toggleColorMode}
			ml="4"
			py="2"
			// rightIcon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
		>
			{colorMode === "light" ? `تاریک` : `روشن`}
		</Button>
	);
}
export default ThemeToggleButton;
