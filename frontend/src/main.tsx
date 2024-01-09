import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: Infinity },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CssVarsProvider defaultMode="dark">
            <CssBaseline />
            <ReactQueryDevtools />
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </CssVarsProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
