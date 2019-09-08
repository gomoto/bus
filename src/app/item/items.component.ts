import { Component, OnInit } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field";

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item> | undefined;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public submitStopId(args: {object: TextField}): void {
        // returnPress event will be triggered when user submits a value
        const textField = args.object;
        console.log("Submitted stop ID:", textField.text);
    }
}
