import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [emailAction, setEmailAction] = useState(false);
  const [googleLoading, setEGoogleLoading] = useState(false);
  const [user, setUser] = useState(null);

  const registerWithEmail = async (email, password) => {
    setEmailAction(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setEmailAction(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    setEmailAction(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setEmailAction(false);
    }
  };

  const signInWithGoogle = async () => {
    setEGoogleLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setEGoogleLoading(false);
    }
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (profile) => {
    if (!auth.currentUser) return;
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = useMemo(
    () => ({
      registerWithEmail,
      signInWithEmail,
      signInWithGoogle,
      userSignOut,
      updateUser,
      authLoading,
      emailAction,
      googleLoading,
      user,
    }),
    [authLoading, emailAction, googleLoading, user],
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
