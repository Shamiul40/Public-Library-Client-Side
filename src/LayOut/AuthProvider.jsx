import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider,  signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.init';




export const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser =(updateData)=>{
    return updateProfile(auth.currentUser, updateData)
  } 

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };


  const googleProvider = new GoogleAuthProvider();

const googleLogin = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
};



  const authInfo ={
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    loading,
    updateUser,
    googleLogin
  }

  return (
   
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    
  );
};

export default AuthProvider;






