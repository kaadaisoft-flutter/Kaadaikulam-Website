import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, getDocs, collection, query, limit } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAdminAccess = async (uid) => {
        try {
            // Check if any admin exists at all
            const adminQuery = query(collection(db, 'admin'), limit(1));
            const adminSnapshots = await getDocs(adminQuery);
            
            // If no admin exists in the entire database, the first user who tries to log in 
            // (or specific setup flow) can be treated as admin to initialize the system.
            if (adminSnapshots.empty) {
                console.log("No admins found. Initializing first admin...");
                await setDoc(doc(db, 'admin', uid), {
                    email: auth.currentUser?.email,
                    createdAt: new Date(),
                    isInitialAdmin: true
                });
                return true;
            }

            const adminRef = doc(db, 'admin', uid);
            const adminSnap = await getDoc(adminRef);
            return adminSnap.exists();
        } catch (error) {
            console.error("Error checking admin access:", error);
            return false;
        }
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
