import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, localStorageManager } from "@chakra-ui/react";
createRoot(document.getElementById("root")!).render(
	<ChakraProvider colorModeManager={localStorageManager}>
		<App />
	</ChakraProvider>
);
