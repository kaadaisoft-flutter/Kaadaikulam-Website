import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAdminAccess = async (uid) => {
        const adminRef = doc(db, 'admin', uid);
        const adminSnap = await getDoc(adminRef);
        return adminSnap.exists();
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
                return;
            }
            const isAdmin = await checkAdminAccess(firebaseUser.uid);
            if (isAdmin) {
                setIsAuthenticated(true);
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || firebaseUser.email,
                    role: 'admin',
                });
            } else {
                await signOut(auth);
                setIsAuthenticated(false);
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const isAdmin = await checkAdminAccess(userCredential.user.uid);
            if (!isAdmin) {
                await signOut(auth);
                return false;
            }
            setIsAuthenticated(true);
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                name: userCredential.user.displayName || userCredential.user.email,
                role: 'admin',
            });
            return true;
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Logout error:', err);
        }
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
