 import { Component, OnInit } from "@angular/core";
import {
  CloseModalEventEmmiter,
  ExitModalEventEmmiter
} from "../models/modal.eventemitter.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { IfStmt } from "@angular/compiler";
import { USER_ROLES_STAFF, STATUS_USER_NEW } from "../shared";
import { LoginService, QueeService } from "../services";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  showPopup: boolean;
  openAddPatient: boolean;
  openAddMedicalAid: boolean;
  openAddEmengencyContact: boolean;
  quees$: Observable<Array<any>>;
  showOptions: boolean;
  toggleMobileMenu: boolean;
  isNewUser: boolean = false;
  userId: string;
  currentUser: any;
  user: any;
  constructor(
    private queeService: QueeService,
    private router: Router,
    private authicateService: LoginService
  ) {
    this.quees$ = this.queeService.getQuees();
    setInterval(data => {
      this.quees$ = this.queeService.getQuees();
    }, 10000);
  }

  ngOnInit() {
    //get userid
    this.authicateService.currentUser.subscribe(u => (this.user = u));
    //get user details
    this.authicateService.getFullUserDetails(this.user.UserId).subscribe(r => {
      this.currentUser = r;
      //User not verified
      if (Number(this.currentUser.StatusId) == STATUS_USER_NEW) {
        this.isNewUser = true;
      }
    });
  }
  showAddPatientModal() {
    this.showPopup = true;
    this.openAddPatient = true;
  }
  closeModal(e: CloseModalEventEmmiter) {
    this.cloaseAll();
    console.log(e);

    if (e.closeAll) {
      this.showPopup = false;
    } else if (e.openAddMedicalAid) {
      this.openAddPatient = false;
      this.openAddMedicalAid = true;
    } else if (e.openAddEmengencyContact) {
      this.openAddPatient = false;
      this.openAddMedicalAid = false;
      this.openAddEmengencyContact = true;
    }
  }
  cloaseAll() {
    this.openAddPatient = false;
    this.openAddEmengencyContact = false;
    this.openAddMedicalAid = false;
  }
  openOptions() {
    this.showOptions = true;
  }
  toggleNavMobile() {
    this.toggleMobileMenu = !this.toggleMobileMenu;
  }
  closeOptions(e: ExitModalEventEmmiter) {
    if (e.close) {
      this.showOptions = false;
    }
  }
  nextQuee() {
    this.quees$.subscribe(data => {
      let queeList: Array<any> = data;
      if (queeList.length) {
        let ids = queeList.map(x => Number(x.QuiID));
        let nextId = Math.min(...ids);

        //beep
        // let beep = document.getElementById("myAudio");
        // beep.play();

        let audio = new Audio();
        audio.src = "../../assets/sounds/beep.wav";
        audio.load();
        audio.play();
        setTimeout(function() {
          // say it
          var base = `Now calling patient number, ${nextId}`;
          var msg = new SpeechSynthesisUtterance(base);
          window.speechSynthesis.speak(msg);
        }, 1000);

        console.log(nextId);
        // update db
        console.log(nextId);
        this.queeService.updateQuee({ QuiID: nextId }).subscribe(r => {
          //  alert(r);
          this.quees$ = this.queeService.getQuees();
          // navigate
          let pid = queeList.filter(x => Number(x.QuiID) === Number(nextId));
          if (pid.length > 0) {
            this.router.navigate([`/dashboard/patient/${pid[0].PatientId}`]);
          }
        });
      }
    });
  }

  logout() {
    this.authicateService.logout();
    this.router.navigate(["/"]);
  }
}
