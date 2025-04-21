import { createContext, useState } from "react";

type User = {
    id: string;
    name: string;
    role: string;
}

type LoginContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { }
});

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </LoginContext.Provider>
    );
};


export { LoginProvider, LoginContext };