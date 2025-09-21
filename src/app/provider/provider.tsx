import { StrictMode } from "react"
import { BrowserRouter } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./themeProvider"
import type { ReactNode } from "react"

type ProviderProps = {
    children: ReactNode
}

const queryClient = new QueryClient()

const Provider = ({ children }: ProviderProps) => {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>
    )
}

export default Provider