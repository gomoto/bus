import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getJSON } from 'tns-core-modules/http';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as BusAction from '../bus/action';
import { DeparturesResponse } from '../bus/state';
import { State as AppState } from '../state';

@Component({
    selector: 'ns-bus-stop',
    styleUrls: ['./bus-stop.component.css'],
    templateUrl: './bus-stop.component.html',
})
export class BusStopComponent {
    constructor(
        private store: Store<AppState>,
    ) {}

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
