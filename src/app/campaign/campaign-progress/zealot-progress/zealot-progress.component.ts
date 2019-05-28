import { Component, OnInit, OnDestroy } from '@angular/core';
import { ZealotProgressService } from './zealot-progress.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zealot-progress',
  templateUrl: './zealot-progress.component.html',
  styleUrls: ['./zealot-progress.component.css']
})
export class ZealotProgressComponent implements OnInit, OnDestroy {

  interrogated = '';
  escaped = '';

  interrogatedList: string[] = [];
  escapedList: string[] = [];

  interrogatedSub: Subscription;
  escapedSub: Subscription;

  constructor(private zealotProgressService: ZealotProgressService) { }

  ngOnInit() {
    this.interrogatedList = this.zealotProgressService.getInterrogatedCultists();
    this.escapedList = this.zealotProgressService.getEscapedCultists();

    this.interrogatedSub = this.zealotProgressService.interrogatedChanged.subscribe(
      () => {
        this.interrogatedList = this.zealotProgressService.getInterrogatedCultists();
      }
    );

    this.escapedSub = this.zealotProgressService.escapedChanged.subscribe(
      () => {
        this.escapedList = this.zealotProgressService.getEscapedCultists();
      }
    );
  }

  ngOnDestroy() {
    this.interrogatedSub.unsubscribe();
    this.escapedSub.unsubscribe();
  }

  onAddInterrogated() {
    this.zealotProgressService.addInterrogatedCultist(this.interrogated);
    this.interrogated = '';
  }

  onRemoveInterrogated(id: number) {
    this.zealotProgressService.removeInterrogatedCultist(id);
  }

  onAddEscaped() {
    this.zealotProgressService.addEscapedCultist(this.escaped);
    this.escaped = '';
  }

  onRemoveEscaped(id: number) {
    this.zealotProgressService.removeEscapedCultist(id);
  }
}
