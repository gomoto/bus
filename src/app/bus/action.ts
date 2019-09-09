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
