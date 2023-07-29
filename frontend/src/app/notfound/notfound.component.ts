import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }
  @Input() visible=false;
  @Input() message='Nothing Found';
  @Input() resetLinkText='Reset';
  @Input() resetLinkRoute='/';

  ngOnInit(): void {
  }

}
