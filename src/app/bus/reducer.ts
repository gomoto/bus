import { createReducer, on } from '@ngrx/store';
import * as Action from './action';
import { State } from './state';

export const initialState: State = {
    currentStopId: '',
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(Action.departuresLoaded, (state) => {
        return state;
    }),
);
