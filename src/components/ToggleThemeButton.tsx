import { IconButton, useColorMode } from "@chakra-ui/react";
import SunIcon from "../assets/sun.svg?react";
import MoonIcon from "../assets/moon.svg?react";
function ThemeToggleButton() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label="toggle dark mode"
			icon={
				colorMode === "light" ? (
					<MoonIcon width={24} height={24} />
				) : (
					<SunIcon width={24} height={24} />
				)
			}
			onClick={toggleColorMode}
			ml="4"
			py="2"
			pos="fixed"
			top={4}
			zIndex={1}
			right={4}
			shadow="md"
			borderRadius="full"
		/>
		// <Button
		// 	onClick={toggleColorMode}
		// 	ml="4"
		// 	py="2"
		// 	pos="fixed"
		// 	top={4}
		// 	zIndex={1}
		// 	right={4}
		// 	shadow="md"
		// 	borderRadius="full"
		// 	rightIcon={
		// 		colorMode === "light" ? (
		// 			<MoonIcon width={24} height={24} />
		// 		) : (
		// 			<SunIcon width={24} height={24} />
		// 		)
		// 	}
		// >
		// 	{/* {colorMode === "light" ? `تاریک` : `روشن`} */}
		// </Button>
	);
}
export default ThemeToggleButton;
