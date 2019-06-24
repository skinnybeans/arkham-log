import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dunwitch-progress',
  templateUrl: './dunwitch-progress.component.html',
  styleUrls: ['./dunwitch-progress.component.css']
})
export class DunwitchProgressComponent implements OnInit {

  sacrificed = '';
  sacrificedList: string[] = ['Captain Jack', 'Giant Squid'];
  constructor() { }

  ngOnInit() {
  }

}
