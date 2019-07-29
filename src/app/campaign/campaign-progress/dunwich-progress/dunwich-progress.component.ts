import { Component, OnInit, OnDestroy } from '@angular/core';
import { DunwichProgressService } from './dunwich-progress.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dunwich-progress',
  templateUrl: './dunwich-progress.component.html',
  styleUrls: ['./dunwich-progress.component.css']
})
export class DunwichProgressComponent implements OnInit, OnDestroy {

  sacrificed = '';
  sacrificedList: string[] = [];
  sacrificeSub: Subscription;

  constructor(
    private dunwichProgressService: DunwichProgressService
  ) { }

  ngOnInit() {
    this.sacrificedList = this.dunwichProgressService.getSacrificeList();

    this.sacrificeSub = this.dunwichProgressService.sacrificesChanged.subscribe(
      sacrificeList => {
        this.sacrificedList = sacrificeList;
      }
    );
  }

  ngOnDestroy() {
    this.sacrificeSub.unsubscribe();
  }

  onAdd() {
    this.dunwichProgressService.addSacrifice(this.sacrificed);
    this.sacrificed = '';
  }

  onDelete(index: number) {
    this.dunwichProgressService.removeSacrifice(index);
  }
}
