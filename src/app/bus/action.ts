import { createAction, props } from '@ngrx/store';
import { Departure } from './state';

export const departuresLoaded = createAction(
    'bus.departuresLoaded',
    props<{stopId: string, departures: Departure[]}>(),
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
