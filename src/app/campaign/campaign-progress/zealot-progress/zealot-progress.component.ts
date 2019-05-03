import { Component, OnInit } from '@angular/core';
import { ZealotProgressService } from './zealot-progress.service';

@Component({
  selector: 'app-zealot-progress',
  templateUrl: './zealot-progress.component.html',
  styleUrls: ['./zealot-progress.component.css']
})
export class ZealotProgressComponent implements OnInit {

  interrogated = '';
  escaped = '';

  interrogatedList: string[] = [];
  escapedList: string[] = [];
  constructor(private zealotProgressService: ZealotProgressService) { }

  ngOnInit() {
    this.interrogatedList = this.zealotProgressService.getInterrogatedCultists();
    this.escapedList = this.zealotProgressService.getEscapedCultists();

    this.zealotProgressService.interrogatedChanged.subscribe(
      () => {
        this.interrogatedList = this.zealotProgressService.getInterrogatedCultists();
      }
    );

    this.zealotProgressService.escapedChanged.subscribe(
      () => {
        this.escapedList = this.zealotProgressService.getEscapedCultists();
      }
    );
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
