import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { BusStopComponent } from "./bus-stop/bus-stop.component";
import { BusStopDeparturesComponent } from "./bus-stop-departures/bus-stop-departures.component";

const routes: Routes = [
    { path: "", redirectTo: "/bus-stop", pathMatch: "full" },
    { path: "bus-stop", component: BusStopComponent },
    { path: "bus-stop-departures/:stopId", component: BusStopDeparturesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
