import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusStopDeparturesComponent } from './bus-stop-departures/bus-stop-departures.component';
import { BusStopComponent } from './bus-stop/bus-stop.component';
import { Effects } from './effects';
import { reducers } from './reducers';

import './pull-to-refresh';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        BusStopComponent,
        BusStopDeparturesComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        EffectsModule.forRoot([Effects]),
        StoreModule.forRoot(reducers),
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA,
    ],
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
