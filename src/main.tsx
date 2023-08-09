import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { theme } from "./styles/theme.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>
);
