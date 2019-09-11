import * as connectivity from 'tns-core-modules/connectivity';

export interface State {
    connectionType: connectivity.connectionType;
    currentStopId: string;
    departuresByStop: {
        [stopId: string]: {
            // Departure info is always changing, so store the time at which the data was fetched
            departures: Departure[];
            timestamp: number; // milliseconds
            loading: boolean;
        };
    };
}

export type StopId = string;
export type RouteId = string;
export type TripId = string;
export type VehicleId = string;

export interface Departure {
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
        phase: 'in_progress'; // other phases?
        position: {
            lat: number;
            lon: number;
        }
        predicted: boolean;
        scheduleDeviation: number;
        scheduledDistanceAlongTrip: number;
        serviceDate: number;
        situationIds: [];
        status: 'SCHEDULED'; // other statuses?
        totalDistanceAlongTrip: number;
        vehicleId: VehicleId;
    };
    vehicleId: VehicleId;
}

export interface DeparturesResponse {
    code: number;
    currentTime: number;
    data: {
        entry: {
            arrivalsAndDepartures: Departure[];
            nearbyStopIds: string[];
            situationIds: [];
            stopId: StopId;
        },
    };
    text: string;
    version: number;
}
