import { Component, OnInit, Input } from '@angular/core';
import { CardModel } from 'src/app/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() model: CardModel;
  fullname = 'Freedom Khanyile';
  initials: string;
  constructor() { }

  ngOnInit() {
    this.initials = this.fullname.split(' ')[0][0] + this.fullname.split(' ')[1][0];
  }
}
