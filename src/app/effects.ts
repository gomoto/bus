import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterExtensions } from 'nativescript-angular/router';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BusAction from './bus/action';

// All side effects in the application.
@Injectable()
export class Effects {
    public navigateToDepartures$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BusAction.stopChosen),
            mergeMap((action) => {
                // Attempt to navigate to bus stop detail view.
                return from(this.routerExtensions.navigate(['/bus-stop-departures', action.stopId]))
                .pipe(
                    // If navigation succeeds:
                    map(() => BusAction.stopNavigationSucceeded({stopId: action.stopId})),
                    // If navigation fails:
                    catchError(() => of(BusAction.stopNavigationFailed({stopId: action.stopId}))),
                );
            }),
        ),
    );

    constructor(
        private actions$: Actions,
        private routerExtensions: RouterExtensions,
    ) {}
}
