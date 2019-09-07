import { STATUS_USER_NEW } from "./../../shared/config";
import { User } from "./../../models/user";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
 import { first } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { LoginService } from "src/app/services";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"]
})
export class VerifyEmailComponent implements OnInit {
  userId: string;
  currentUser: User;
  progress:string = 'Verifying your account....'
  Error: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authicateService: LoginService,
    private UserService: UserService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r["id"];
    });
  }

  ngOnInit() {
    this.authicateService.getFullUserDetails(this.userId).subscribe(r => {
      if (r == null) {
        return false;
      }
      this.currentUser = r;
      if (Number(this.currentUser.StatusId) == STATUS_USER_NEW) {
        this.currentUser.StatusId = 3;
        this.UserService.updateUser(this.currentUser).subscribe(res => {
          alert(JSON.stringify(res));
        });
        this.authicateService
          .loginUser(this.currentUser.Email, this.currentUser.Password)
          .pipe(first())
          .subscribe(response => {
            if (response) {
              // this.router.navigate(["/dashboard"]);
              this.router.navigate(["/dashboard"]);
              // this.spinnerService.hideSpinner();
            } else {
              // this.error = response;
              alert("Error");
            }
          });
      }else{
        this.Error ="This activation link  have already been used";
        this.progress ="";
      }
    });
  }
}
