import { Reducer } from 'redux';
import {DimmedState} from '@/types/types';

const initialState: DimmedState = {
    isActive: false,
};

export const DimmedReducers: Reducer<DimmedState> = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};