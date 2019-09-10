import { createReducer, on } from '@ngrx/store';
import * as Action from './action';
import { State } from './state';

export const initialState: State = {
    currentStopId: '',
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(Action.departuresLoaded, (state, action) => {
        const newState = {
            ...state,
            departuresByStop: {
                ...state.departuresByStop,
                [action.stopId]: action.departures,
            },
        };
        return newState;
    }),
    on(Action.stopNavigationSucceeded, (state, action) => {
        const newState = {
            ...state,
            currentStopId: action.stopId,
        };
        return newState;
    }),
);
