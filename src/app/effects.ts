import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterExtensions } from 'nativescript-angular/router';
import { from, fromEventPattern, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as connectivity from 'tns-core-modules/connectivity';
import { getJSON } from 'tns-core-modules/http';
import * as BusAction from './bus/action';
import { DeparturesResponse } from './bus/state';

// All side effects in the application.
@Injectable()
export class Effects {
    // Navigate to departures view when stop is chosen.
    public navigateToDepartures$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusAction.stopChosen),
            mergeMap(({stopId}) => {
                // Attempt to navigate to bus stop detail view.
                return from(this.routerExtensions.navigate(['/bus-stop-departures', stopId]))
                .pipe(
                    // If navigation succeeds:
                    map(() => BusAction.stopNavigationSucceeded({stopId})),
                    // If navigation fails:
                    catchError(() => of(BusAction.stopNavigationFailed({stopId}))),
                );
            }),
        ),
    );

    // Fetch departures when departures are loaded or stop is chosen.
    public loadDepartures$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusAction.stopChosen, BusAction.departuresRefreshed),
            mergeMap(({stopId}) => {
                // Attempt to fetch departures.
                const url = `https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${stopId}.json?key=TEST&includeReferences=false&minutesBefore=0&minutesAfter=15`;
                return from(getJSON(url).then((response) => {
                    const departures = (response as DeparturesResponse).data.entry.arrivalsAndDepartures;
                    return departures;
                }))
                .pipe(
                    // If fetch succeeds:
                    map((departures) => BusAction.departuresLoaded({stopId, departures})),
                    // If fetch fails:
                    catchError((error) => of(BusAction.departuresFailedToLoad({stopId, error}))),
                );
            }),
        ),
    );

    // Convert connectivity events into actions
    public connectivity$ = createEffect(() => {
        return fromEventPattern<connectivity.connectionType>(
            function addHandler(handler) {
                connectivity.startMonitoring(handler);
            },
            function removeHandler(handler) {
                connectivity.stopMonitoring();
            },
        )
        .pipe(map((connectionType) => BusAction.connectionTypeChanged({connectionType})));
    });

    constructor(
        private actions$: Actions,
        private routerExtensions: RouterExtensions,
    ) {}
}
