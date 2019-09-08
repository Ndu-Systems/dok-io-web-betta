import { Component, OnInit, Input } from '@angular/core';
import { TableModel } from 'src/app/models/table-model';
import { UpcomingAppointment } from 'src/app/models';


@Component({
  selector: 'app-quick-reminders',
  templateUrl: './quick-reminders.component.html',
  styleUrls: ['./quick-reminders.component.scss']
})
export class QuickRemindersComponent implements OnInit {
  @Input() model: TableModel;
  appointment = 'appointment';
  constructor() { }

  ngOnInit() {
   }







}
