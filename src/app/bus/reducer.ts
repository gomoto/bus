import { createReducer, on } from '@ngrx/store';
import { State } from "./state";
import { putBusStopDepartures } from './action';

export const initialState: State = {
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(putBusStopDepartures, (state) => {
        return state;
    }),
);
