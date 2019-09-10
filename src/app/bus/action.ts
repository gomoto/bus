import { createAction, props } from '@ngrx/store';
import * as connectivity from 'tns-core-modules/connectivity';
import { Departure } from './state';

export const departuresLoaded = createAction(
    'bus.departuresLoaded',
    props<{stopId: string, departures: Departure[]}>(),
);

export const departuresFailedToLoad = createAction(
    'bus.departuresFailedToLoad',
    props<{stopId: string, error: Error}>(),
);

export const stopChosen = createAction(
    'bus.stopChosen',
    props<{stopId: string}>(),
);

export const stopNavigationSucceeded = createAction(
    'bus.stopNavigationSucceeded',
    props<{stopId: string}>(),
);

export const stopNavigationFailed = createAction(
    'bus.stopNavigationFailed',
    props<{stopId: string}>(),
);

export const connectionTypeChanged = createAction(
    'bus.connectionTypeChanged',
    props<{connectionType: connectivity.connectionType}>(),
);
