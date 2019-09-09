import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as BusState } from './bus/state';
import * as features from './features';
import { State } from './state';

export const bus = createFeatureSelector<State, BusState>(features.bus);

export const departuresList = createSelector(
    bus,
    (state: BusState) => {
        const departures = state.departuresByStop[state.currentStopId];
        if (!departures) {
            return [];
        }
        return departures;
    },
);
