import { createReducer, on } from "@ngrx/store";
import { putBusStopDepartures } from "./action";
import { State } from "./state";

export const initialState: State = {
    departuresByStop: {},
};

export const reducer = createReducer(
    initialState,
    on(putBusStopDepartures, (state) => {
        return state;
    }),
);
