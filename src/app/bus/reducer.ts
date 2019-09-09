import { createReducer, on } from '@ngrx/store';
import { departuresLoaded } from './action';
import { State } from './state';

export const initialState: State = {
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(departuresLoaded, (state) => {
        return state;
    }),
);
