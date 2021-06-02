import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { SubSink } from "subsink";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subs = new SubSink();
  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    store: Store<AppState>,
    private alertCtrl: AlertController
  ) {
    this.subs.sink = store.subscribe((x) => {
      if (x.auth.credentials.access_token) {
        router.navigateByUrl("/app", { replaceUrl: true });
        this.auth.getUserProfile().subscribe(
          (x) => { 
          },
          async (err) => {
            const alert = await this.alertCtrl.create({
              header: "Error",
              message: err.message,
            });
            alert.present();
          }
        );
      }
    });

    this.loginForm = fb.group({
      id: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      remember: [false, []],
    });
  }

  ngOnInit() {}

  save() {
    const v = this.loginForm.value;
    this.auth.signIn(v.id.toString(), v.password.toString(), v.remember).subscribe(
      () => {
        this.router.navigateByUrl("/app", { replaceUrl: true });
        this.auth.getUserProfile().subscribe(
          () => {},
          async (err) => {
            const alert = await this.alertCtrl.create({
              header: "Error",
              message: err.message,
            });
            alert.present();
          }
        );
      },
      async (err) => {
        const alert = await this.alertCtrl.create({
          header: "Error",
          message: err.message,
        });
        alert.present();
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
