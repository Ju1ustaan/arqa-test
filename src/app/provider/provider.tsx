import { StrictMode } from "react"
import { BrowserRouter } from "react-router"
import type { ReactNode } from "react"

type ProviderProps = {
    children: ReactNode
}

const Provider = ({ children }: ProviderProps) => {
    return (
        <StrictMode>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </StrictMode>
    )
}

export default Provider