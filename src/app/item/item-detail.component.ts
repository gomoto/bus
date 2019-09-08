import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getJSON } from "tns-core-modules/http";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-details",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: Item | undefined;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
        getJSON("https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_67112.json?key=TEST&includeReferences=false&minutesBefore=0&minutesAfter=45")
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
            console.error("Error:", e);
        });
    }
}
