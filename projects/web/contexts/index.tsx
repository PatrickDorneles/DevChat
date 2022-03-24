import { AuthContextProvider } from "./auth";

export const GlobalContextProvider: React.FC = ({ children }) => (
    <AuthContextProvider>
        {children}
    </AuthContextProvider>
)