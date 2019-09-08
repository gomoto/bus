import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-bus-stop-departures",
    templateUrl: "./bus-stop-departures.component.html",
    styleUrls: ["./bus-stop-departures.component.css"],
})
export class BusStopDeparturesComponent implements OnInit {
    stopId: string | undefined; // undefined until OnInit

    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.stopId = this.route.snapshot.params.stopId;
        if (!this.stopId) {
            throw new Error('whoops');
        }
    }
}
