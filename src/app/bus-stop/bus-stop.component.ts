import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TextField } from 'tns-core-modules/ui/text-field';
import * as BusAction from '../bus/action';
import * as selectors from '../selectors';
import { State as AppState } from '../state';


@Component({
    selector: 'ns-bus-stop',
    styleUrls: ['./bus-stop.component.css'],
    templateUrl: './bus-stop.component.html',
})
export class BusStopComponent {
    public hasNetworkConnection$: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
    ) {
        this.hasNetworkConnection$ = this.store.pipe(
            map((state) => selectors.hasNetworkConnection(state)),
        );
    }

    public submitStopId(args: {object: TextField}): void {
        const textField = args.object;
        const stopId = textField.text;
        this.store.dispatch(BusAction.stopChosen({stopId}));
    }
}
