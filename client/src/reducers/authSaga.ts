/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout, verifyUserStart, verifyUserSuccess, verifyUserFailure } from './authSlice';

interface YourLoginPayloadType {
  username: string;
  password: string;
}

interface UserDetails {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  music: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoginResponseData {
  data: {
    success: string;
    message: string;
    data: {
      details: UserDetails;
      role: string;
      access_token: string;
    };
  };
}

interface CustomError {
  success: 'error';
  status: number;
  message: string;
}

// Updated loginSaga with proper typing
function* loginSaga(action: PayloadAction<YourLoginPayloadType>): Generator<any, void, LoginResponseData> {
  try {
    const response: LoginResponseData = yield call(
      axios.post,
      'http://localhost:5000/api/auth/login',
      action.payload
    );
    yield put(loginSuccess(response.data));

    const { access_token } = response.data.data;
    document.cookie = `access_token=${access_token}; path=/`;
  } catch (error: unknown) {
    if (isCustomError(error)) {
      yield put(loginFailure(error.message));
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Helper function to determine if the error is a CustomError
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCustomError(obj: any): obj is CustomError {
  return obj && obj.success === 'error' && typeof obj.status === 'number' && typeof obj.message === 'string';
}

// Updated logoutSaga with proper typing
function* logoutSaga(): Generator<any, void, void> {
  try {
    yield call(axios.post, 'http://localhost:5000/api/auth/login', { withCredentials: true });
    yield put(logout());

    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  } catch (error: unknown) {
    if (isCustomError(error)) {
      yield put(loginFailure(error.message));
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Typing for verifyUserSaga action and generator
interface VerifyUserPayload {
  _id: string;
}

function* verifyUserSaga(action: PayloadAction<VerifyUserPayload>): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, `http://localhost:5000/api/auth/user/${action.payload._id}`, {
      withCredentials: true,
    });

    yield put(verifyUserSuccess(response.data));
  } catch (error: unknown) {
    if (isCustomError(error)) {
      yield put(verifyUserFailure(error.message));
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Watchers
export function* watchLogin() {
  yield takeEvery(loginStart.type, loginSaga);
}

export function* watchLogout() {
  yield takeEvery(logout.type, logoutSaga);
}

export function* watchVerifyUser() {
  yield takeEvery(verifyUserStart.type, verifyUserSaga);
}
