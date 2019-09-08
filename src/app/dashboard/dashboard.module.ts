import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DashboardRoutingModule,
  declarations,
  pipes
} from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AutoCompleteModule,
    Ng2SearchPipeModule,
    ToastModule
  ],
  declarations: [...declarations, ...pipes],
  providers: [MessageService]
})
export class DashboardModule { }
