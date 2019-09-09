import { Departure } from "../bus-stop/bus-stop.component";

export interface State {
    departuresByStop: {
        [stopId: string]: Departure[];
    }
}
