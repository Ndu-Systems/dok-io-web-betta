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
    console.log(this.model)
  }
}
