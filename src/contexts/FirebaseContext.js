import PropTypes from 'prop-types';
import {  getDoc, doc, setDoc } from "firebase/firestore"; 
import { createContext, useEffect, useReducer, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, signOut,createUserWithEmailAndPassword  } from "firebase/auth";
import { db} from './firebase';
// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['demo@minimals.cc', "anand5895@gmail.com"];



const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {

  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = getAuth();
 
  
  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {

          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProfile(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user: docSnap.data() }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    [dispatch]
  );



  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
    
  };

 
  const register = async (email, password, firstName, lastName) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  const { user } = res;

  // Add a new document with a uid.
    const docRef = await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      role: "staff",
      displayName: `${firstName} ${lastName}`
    });
    console.log(docRef)
  
  return res;
  
  
}

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const authUser = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: authUser.uid,
          email: authUser.email,
          photoURL: authUser.photoURL || profile?.photoURL,
          displayName: authUser.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(authUser.email) ? 'admin' : 'user',
          phoneNumber: authUser.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || 'India',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || 'Staff at Silverspoon bakers & Cafe',
          isPublic: profile?.isPublic || false
        },
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
