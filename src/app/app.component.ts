import { SpinnerService } from './services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'dok-io';
  showSpinner:boolean=false;

  constructor(private spinnerService:SpinnerService){

  }
  ngOnInit(){
    this.spinnerService.castSpinner.subscribe(r=>{
     this.showSpinner = r;
    })
  }
}
