import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import request from '../utils/request';
import { ADMIN_URLS } from '../_apis_/urls';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;
    console.log({user})
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {

  const [profile, setProfile] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const getUserDetails = await request("get",ADMIN_URLS.admin_get_user_details, accessToken )
          const {name, id , email, isDeleted, isEmailDelivered, mobile, isAdmin} = getUserDetails.data.data;
          const user = {
            displayName : name,
            id,
            email,
            phoneNumber: mobile,
            isDeleted,
            isEmailDelivered,
            role: isAdmin ? "admin": "staff",
          };

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await request("post",'/admin/login', { 
      username,
      password
    });

    const { AccessToken : accessToken } = response.data.data;
    setSession(accessToken)

    const getUserDetails = await request("get",ADMIN_URLS.admin_get_user_details )

    const {name, id , email, isDeleted, isEmailDelivered, mobile, isAdmin} = getUserDetails.data.data;

    const user = {
      displayName : name,
      id,
      email,
      phoneNumber: mobile,
      isDeleted,
      isEmailDelivered,
      role: isAdmin ? "admin": "staff",
    };

    setProfile(getUserDetails.data);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  const authUser = { ...state.user };
  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        user: {
          id: authUser.id,
          email: authUser.email,
          photoURL: authUser.photoURL || profile?.photoURL || "",
          displayName: authUser.displayName || profile?.displayName,
          // role: ADMIN_EMAILS.includes(authUser.email) ? 'admin' : 'staff',
          role: authUser.role,
          phoneNumber: authUser.phoneNumber || profile?.phoneNumber || '',
          country: profile?.country || 'India',
          address: profile?.address || '',
          state: profile?.state || '',
          city: profile?.city || '',
          zipCode: profile?.zipCode || '',
          about: profile?.about || 'Staff at Silverspoon bakery & Cafe',
          isPublic: profile?.isPublic || false
        },
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
