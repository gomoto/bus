import { Component } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";
import { getJSON } from "tns-core-modules/http";

@Component({
    selector: "ns-bus-stop",
    templateUrl: "./bus-stop.component.html"
})
export class BusStopComponent {
    public submitStopId(args: {object: TextField}): void {
        // returnPress event will be triggered when user submits a value
        const textField = args.object;
        const stopId = textField.text;
        console.log("Submitted stop ID:", stopId);
        const url = `https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_${stopId}.json?key=TEST&includeReferences=false&minutesBefore=0&minutesAfter=45`;
        getJSON(url)
        .then((response) => {
            const departures = (<DeparturesResponse> response).data.entry.arrivalsAndDepartures;
            console.log(`there are ${departures.length} departures`);
        })
        .catch((e) => {
            console.error("Error:", e);
        });
    }
}

type StopId = string;
type RouteId = string;
type TripId = string;
type VehicleId = string;

interface Departure {
    arrivalEnabled: boolean;
    blockTripSequence: number;
    departureEnabled: boolean;
    distanceFromStop: number;
    frequency: null;
    lastUpdateTime: number;
    numberOfStopsAway: number;
    predicted: boolean;
    predictedArrivalInterval: null;
    predictedArrivalTime: number;
    predictedDepartureInterval: null;
    predictedDepartureTime: number;
    routeId: RouteId;
    routeLongName: string;
    routeShortName: string;
    scheduledArrivalInterval: null;
    scheduledArrivalTime: number;
    scheduledDepartureInterval: null;
    scheduledDepartureTime: number;
    serviceDate: number;
    situationIds: [];
    status: string;
    stopId: StopId;
    stopSequence: number;
    totalStopsInTrip: number;
    tripHeadsign: string;
    tripId: TripId;
    tripStatus: {
        activeTripId: TripId;
        blockTripSequence: number;
        closestStop: StopId;
        closestStopTimeOffset: number;
        distanceAlongTrip: number;
        frequency: null;
        lastKnownDistanceAlongTrip: number;
        lastKnownLocation: {
            lat: number;
            lon: number;
        }
        lastKnownOrientation: number;
        lastLocationUpdateTime: number;
        lastUpdateTime: number;
        nextStop: StopId;
        nextStopTimeOffset: number;
        orientation: number;
        phase: "in_progress"; // other phases?
        position: {
            lat: number;
            lon: number;
        }
        predicted: boolean;
        scheduleDeviation: number;
        scheduledDistanceAlongTrip: number;
        serviceDate: number;
        situationIds: [];
        status: "SCHEDULED"; // other statuses?
        totalDistanceAlongTrip: number;
        vehicleId: VehicleId;
    }
    vehicleId: VehicleId;
}

interface DeparturesResponse {
    code: number;
    currentTime: number;
    data: {
        entry: {
            arrivalsAndDepartures: Departure[];
            nearbyStopIds: string[];
            situationIds: [];
            stopId: StopId;
        }
    }
    text: string;
    version: number;
}
