import { Component, OnInit } from '@angular/core';
import { UpcomingAppointment, TableModel, ActiveQueuesStatsModel } from 'src/app/models';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  appointmentModel: TableModel;
  queueModel: TableModel;
  appointments: UpcomingAppointment[] = [
    {
      FullName: 'test',
      Type: 'test',
      Date: '12:30 pm 2019/09/20'
    },
    {
      FullName: 'test',
      Type: 'test',
      Date: '12:30 pm 2019/09/20'
    },
    {
      FullName: 'test',
      Type: 'test',
      Date: '12:30 pm 2019/09/20'
    },
    {
      FullName: 'test',
      Type: 'test',
      Date: '12:30 pm 2019/09/20'
    },
  ];
  activeQueues: ActiveQueuesStatsModel[] = [
    {
      FullName: 'Peter John',
      HasMedicalAid: true,
      RegisteredDate: '12:30 pm 2019/09/20'
    },
    {
      FullName: 'Peter John',
      HasMedicalAid: true,
      RegisteredDate: '12:30 pm 2019/09/20'
    },
    {
      FullName: 'Peter John',
      HasMedicalAid: true,
      RegisteredDate: '12:30 pm 2019/09/20'
    },
  ];
  constructor() { }

  ngOnInit() {
    this.populateTable();
    this.populateQueues();
  }

  populateTable() {
    this.appointmentModel = new TableModel();
    this.appointmentModel.title = 'upcoming appointments';
    this.appointmentModel.image = 'appointment';
    this.appointmentModel.items = this.appointments;
  }

  populateQueues() {
    this.queueModel = new TableModel();
    this.queueModel.title = 'active queues';
    this.queueModel.image = 'queue';
    this.queueModel.items = this.activeQueues;
  }

}
