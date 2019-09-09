import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ns-bus-stop-departures',
    styleUrls: ['./bus-stop-departures.component.css'],
    templateUrl: './bus-stop-departures.component.html',
})
export class BusStopDeparturesComponent implements OnInit {
    public stopId: string | undefined; // undefined until OnInit

    constructor(
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.stopId = this.route.snapshot.params.stopId;
        if (!this.stopId) {
            throw new Error('whoops');
        }
    }
}
