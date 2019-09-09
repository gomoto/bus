import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { BusStopDeparturesComponent } from './bus-stop-departures/bus-stop-departures.component';
import { BusStopComponent } from './bus-stop/bus-stop.component';

const routes: Routes = [
    { path: '', redirectTo: '/bus-stop', pathMatch: 'full' },
    { path: 'bus-stop', component: BusStopComponent },
    { path: 'bus-stop-departures/:stopId', component: BusStopDeparturesComponent },
];

@NgModule({
    exports: [NativeScriptRouterModule],
    imports: [NativeScriptRouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
