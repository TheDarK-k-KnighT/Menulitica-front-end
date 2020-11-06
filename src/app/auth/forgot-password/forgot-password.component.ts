import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ForgotPasswordModel } from 'app/models/auth-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private validationMessages: { [key: string]: { [key: string]: string } };
  public form: FormGroup;
  private userLogin: ForgotPasswordModel = new ForgotPasswordModel();

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    ) {
    this.validationMessages = {
      email: {
        required: 'Please enter email address',
        email: 'Please enter valid email address'
      }
    };
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  public onSendOTP() {
    //Send OTP to user email id
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsDirty();
        this.form.controls[field].markAsTouched();
      });
    } else {
    //   this.authService.forgotPassword(this.prepareToSend()).subscribe(response => {
    //     if (response.success === true) {
    //       this.form.reset();
    //       this.toastrService.success(response.message);
    //       // this.router.navigate(['/auth/forgotpassword/']);
    //     }
    //     else {
    //       this.toastrService.error(response.message);
    //     }
    //   }, error => {
    //     this.toastrService.error("Network Error");
    //   });
    }
  }


  private prepareToSend(): ForgotPasswordModel {
    const formData = this.form.value;
    this.userLogin.Email = formData.email;
    return this.userLogin;
  }

  public displayValidationMessages(control: string): string[] {
    const messages = [];
    Object.keys(this.validationMessages[control]).forEach(validator => {
      if ((this.form.get(control).touched || this.form.get(control).dirty) && this.form.get(control).errors) {
        if (this.form.get(control).errors[validator]) {
          messages.push(this.validationMessages[control][validator]);
        }
      }
    });
    return messages;
  }
}
