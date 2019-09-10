import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as connectivity from 'tns-core-modules/connectivity';
import { State as BusState } from './bus/state';
import * as features from './features';
import { State } from './state';

export const bus = createFeatureSelector<State, BusState>(features.bus);

export const currentStopId = createSelector(
    bus,
    (state) => state.currentStopId,
);

export const departuresList = createSelector(
    bus,
    (state) => {
        if (!state.departuresByStop[state.currentStopId]) {
            return [];
        }
        return state.departuresByStop[state.currentStopId].departures;
    },
);

export const hasNetworkConnection = createSelector(
    bus,
    ({connectionType}) => {
        switch (connectionType) {
            case connectivity.connectionType.ethernet:
            case connectivity.connectionType.mobile:
            case connectivity.connectionType.wifi: {
                return true;
            }
            default: {
                return false;
            }
        }
    },
);
