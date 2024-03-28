import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/store/store";
export default function App({ Component, pageProps }: AppProps) {
    return <Provider store={store}><ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider></Provider>
}

const theme = createTheme();