import { createReducer, on } from '@ngrx/store';
import * as connectivity from 'tns-core-modules/connectivity';
import * as Action from './action';
import { State } from './state';

export const initialState: State = {
    connectionType: connectivity.connectionType.none,
    currentStopId: '',
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(Action.departuresRefreshed, (state, {stopId}) => {
        const newState = {
            ...state,
            departuresByStop: {
                ...state.departuresByStop,
                [stopId]: {
                    ...state.departuresByStop[stopId],
                    loading: true,
                },
            },
        };
        return newState;
    }),
    on(Action.departuresLoaded, (state, {stopId, departures}) => {
        const newState = {
            ...state,
            departuresByStop: {
                ...state.departuresByStop,
                [stopId]: {
                    departures,
                    loading: false,
                    timestamp: Date.now(),
                },
            },
        };
        return newState;
    }),
    on(Action.departuresFailedToLoad, (state, {stopId}) => {
        const newState = {
            ...state,
            departuresByStop: {
                ...state.departuresByStop,
                [stopId]: {
                    ...state.departuresByStop[stopId],
                    loading: false,
                    timestamp: Date.now(),
                },
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
    on(Action.connectionTypeChanged, (state, {connectionType}) => {
        console.log('connection type changed', connectionType);
        return {
            ...state,
            connectionType,
        };
    }),
);
