import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getJSON } from 'tns-core-modules/http';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as BusAction from '../bus/action';
import { Departure, DeparturesResponse } from '../bus/state';
import * as selectors from '../selectors';
import { State as AppState } from '../state';

@Component({
    selector: 'ns-bus-stop',
    styleUrls: ['./bus-stop.component.css'],
    templateUrl: './bus-stop.component.html',
})
export class BusStopComponent {
    public departures$: Observable<Departure[]>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.departures$ = store.pipe(
            // select(selectors.departuresList)
            map((state) => {
                console.log('state is:', state);
                const projection = selectors.departuresList(state);
                console.log('projection is:', projection);
                return projection;
            }),
        );
    }

    public submitStopId(args: {object: TextField}): void {
        const textField = args.object;
        const stopId = textField.text;
        console.log('Submitted stop ID:', stopId);

        this.store.dispatch(BusAction.stopChosen({stopId}));
        const url = `https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${stopId}.json?key=TEST&includeReferences=false&minutesBefore=0&minutesAfter=45`;
        getJSON(url)
        .then((response) => {
            const departures = (response as DeparturesResponse).data.entry.arrivalsAndDepartures;
            console.log(`there are ${departures.length} departures`);
            this.store.dispatch(BusAction.departuresLoaded({stopId, departures}));
        })
        .catch((e) => {
            console.error('Error:', e);
        });
    }
}
