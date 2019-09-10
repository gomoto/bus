import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as BusAction from '../bus/action';
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
        this.store.dispatch(BusAction.stopChosen({stopId}));
    }
}
