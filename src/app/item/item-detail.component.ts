import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
    selector: 'ns-details',
    templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit {
    public item: Item | undefined;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
    }
}
