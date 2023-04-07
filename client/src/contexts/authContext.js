import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    const user = createUserWithEmailAndPassword(auth, email, password);
    return user;
  };

  const login = (email, password) => {
    const user = signInWithEmailAndPassword(auth,email,password);
    return user;
  }

  const value = {
    currentUser,
    signup,
    login,
  };

  return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
  )
};
