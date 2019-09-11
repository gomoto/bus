import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PullToRefresh } from '@nstudio/nativescript-pulltorefresh';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as BusAction from '../bus/action';
import { Departure } from '../bus/state';
import * as selectors from '../selectors';
import { State as AppState } from '../state';

@Component({
    selector: 'ns-bus-stop-departures',
    styleUrls: ['./bus-stop-departures.component.css'],
    templateUrl: './bus-stop-departures.component.html',
})
export class BusStopDeparturesComponent {
    public departures$: Observable<Departure[]>;
    public departuresLoading$: Observable<boolean>;
    public stopId$: Observable<string>;
    private stopId: string;

    constructor(
        private store: Store<AppState>,
    ) {
        this.departures$ = this.store.pipe(map((state) => selectors.departuresList(state)));
        this.departuresLoading$ = this.store.pipe(map((state) => selectors.departuresListLoading(state)));
        this.stopId$ = this.store.pipe(map((state) => selectors.currentStopId(state)));
        this.stopId = '';
        this.stopId$.subscribe((stopId) => this.stopId = stopId);
    }

    public getDepartureRoute(departure: Departure): string {
        return departure.routeShortName;
    }

    public getDepartureTime(departure: Departure): string {
        const arrivalMilliseconds = (
            departure.predicted ?
            departure.predictedArrivalTime :
            departure.scheduledArrivalTime
        );
        const arrivalMinutes = Math.floor((arrivalMilliseconds - Date.now()) / 1000 / 60);
        return `${arrivalMinutes} min ${departure.predicted ? '(predicted)' : '(scheduled)'}`;
    }

    public refreshDepartures(event: {object: PullToRefresh}): void {
        this.store.dispatch(BusAction.departuresRefreshed({stopId: this.stopId}));
        // TODO: Hide refresh element once departures have been refreshed.
        setTimeout(() => {
            event.object.refreshing = false;
        }, 1000);
    }
}
