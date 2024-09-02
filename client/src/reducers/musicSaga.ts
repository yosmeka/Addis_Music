/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  createMusicStart,
  createMusicSuccess,
  createMusicFailure,
  updateMusicStart,
  updateMusicSuccess,
  updateMusicFailure,
  deleteMusicStart,
  deleteMusicSuccess,
  deleteMusicFailure,
} from './musicSlice';

interface MusicFormData {
  _id: string; 
  title: string;
  artist: string;
  album: string;
  genre: string;
  imageFile: File;
  audioFile: File;
}

function* fetchDataSaga(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, 'https://addis-music-2.onrender.com/api/music/allwithstat');
    yield put(fetchDataSuccess(response.data.data));
  } catch (error: any) { // Explicitly typed as any
    yield put(fetchDataFailure(error.message)); // Use error.message or a default message
  }
}

function* createMusicSaga(action: PayloadAction<{ musicData: MusicFormData; userId: string }>): Generator<any, void, any> {
  try {
    const { musicData, userId } = action.payload;
    const response = yield call(axios.post, `https://addis-music-2.onrender.com/api/music/${userId}`, musicData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    yield put(createMusicSuccess(response.data));
  } catch (error: any) { // Explicitly typed as any
    yield put(createMusicFailure(error.message)); // Use error.message or a default message
  }
}

function* updateMusicSaga(action: PayloadAction<{ id: string; musicId: string; formData: MusicFormData }>): Generator<any, void, any> {
  try {
    const { id, musicId, formData } = action.payload;
    const response = yield call(axios.put, `https://addis-music-2.onrender.com/api/music/${id}/${musicId}`, formData, { withCredentials: true });
    
    yield put(updateMusicSuccess(response.data.data));
  } catch (error: any) { // Explicitly typed as any
    yield put(updateMusicFailure(error.message)); // Use error.message or a default message
  }
}

function* deleteMusicSaga(action: PayloadAction<{ id: string; musicId: string }>): Generator<any, void, any> {
  try {
    const { id, musicId } = action.payload;
    yield call(axios.delete, `https://addis-music-2.onrender.com/api/music/${id}/${musicId}`, { withCredentials: true });

    yield put(deleteMusicSuccess(musicId));
  } catch (error: any) { // Explicitly typed as any
    yield put(deleteMusicFailure(error.message)); // Use error.message or a default message
  }
}

export function* watchMusic() {
  yield takeEvery(fetchDataStart.type, fetchDataSaga);
  yield takeEvery(createMusicStart.type, createMusicSaga);
  yield takeEvery(updateMusicStart.type, updateMusicSaga);
  yield takeEvery(deleteMusicStart.type, deleteMusicSaga);
}
