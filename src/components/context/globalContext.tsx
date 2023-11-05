import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// 컨텍스트 타입 정의
export interface GlobalContextType {
    state: AppState;
    dispatch: Dispatch<AppAction>;
}

// 초기 상태 정의
interface AppState {
    isTest: boolean;
}

// 액션 타입 정의
type AppAction = { type: 'ADD_TO_CART'; payload: any };

// 컨텍스트 생성
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 초기 상태
const initialState: AppState = {
    isTest: true,
};

// 리듀서 함수
const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        // 액션 처리 로직
        case "ADD_TO_CART":

            return {
                ...state,
                isTest: action.payload,
            };
        default:
            return state;
    }
};

// 컨텍스트 프로바이더 컴포넌트
function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextProvider };

export const addToCart = (dispatch: Dispatch<AppAction>, newValue: boolean) => {
    dispatch({ type: 'ADD_TO_CART', payload: newValue });
};