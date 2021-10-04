import app from "libs/firebase";
import { createContext, FC, useEffect, useContext, useState } from "react";
import { User, getAuth, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

type IAuth = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const auth = getAuth(app);

const AuthContext = createContext<IAuth>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
