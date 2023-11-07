import { Reducer } from 'redux';
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "@/firebase/firebaseConfig";
import {getDatabase} from "firebase/database";
import {fireBaseState} from "@/types/types";
import {getStorage} from "@firebase/storage";

// Firebase 앱 초기화
const fireBaseApp = initializeApp(firebaseConfig);

// Firebase 데이터베이스 객체 가져오기
const fireBaseDataBase = getDatabase(fireBaseApp);

// Firebase 스토리지 객체 가져오기
const fireBaseStorage = getStorage(fireBaseApp);

const initialState: fireBaseState = {
    database : fireBaseDataBase,
    storage: fireBaseStorage,
};

export const FireBaseReducers: Reducer<fireBaseState> = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};