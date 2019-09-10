import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    constructor(
        private store: Store<AppState>,
    ) {
        this.departures$ = this.store.pipe(
            map((state) => {
                console.log('state is:', state);
                const projection = selectors.departuresList(state);
                console.log('projection is:', projection);
                return projection;
            }),
        );
    }
}
