import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { getJSON } from "tns-core-modules/http";
import { TextField } from "tns-core-modules/ui/text-field";
import { DeparturesResponse } from "../bus/state";

@Component({
    selector: "ns-bus-stop",
    styleUrls: ["./bus-stop.component.css"],
    templateUrl: "./bus-stop.component.html",
})
export class BusStopComponent {
    constructor(
        private routerExtensions: RouterExtensions,
    ) {}

    public submitStopId(args: {object: TextField}): void {
        // returnPress event will be triggered when user submits a value
        const textField = args.object;
        const stopId = textField.text;
        console.log("Submitted stop ID:", stopId);
        this.routerExtensions.navigate(["/bus-stop-departures", stopId]);
        const url = `https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${stopId}.json?key=TEST&includeReferences=false&minutesBefore=0&minutesAfter=45`;
        getJSON(url)
        .then((response) => {
            const departures = (response as DeparturesResponse).data.entry.arrivalsAndDepartures;
            console.log(`there are ${departures.length} departures`);
        })
        .catch((e) => {
            console.error("Error:", e);
        });
    }
}
