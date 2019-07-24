import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dunwich-progress',
  templateUrl: './dunwich-progress.component.html',
  styleUrls: ['./dunwich-progress.component.css']
})
export class DunwichProgressComponent implements OnInit {

  sacrificed = '';
  sacrificedList: string[] = ['Captain Jack', 'Giant Squid'];
  constructor() { }

  ngOnInit() {
  }

}
