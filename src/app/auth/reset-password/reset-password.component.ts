import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordModel } from 'app/models/auth-model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  private validationMessages: { [key: string]: { [key: string]: string } };
  public form: FormGroup;
  private userLogin: ResetPasswordModel = new ResetPasswordModel();
  UserId;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router, private activatedRoute: ActivatedRoute)
    {
      this.validationMessages = {
        verificationCode: {
          required: 'Please enter verification Code'
        },
        password: {
          required: 'Please enter password'
        },
        confirmPassword: {
          required: 'Please enter Confirm password',
        }
      };
    }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(params => {
      this.UserId = params['id'];
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      verificationCode:  [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  public onResetPassword() {

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        this.form.controls[field].markAsDirty();
        this.form.controls[field].markAsTouched();
      });
    } else {
      // this.authService.resetPassword(this.prepareToSend()).subscribe(response => {
      //   console.log(response);
      //   if (response.success === true) {
      //     this.toastrService.success('Password change successful');
      //     this.router.navigate(['/auth/login/']);
      //   }
      //   else {
      //     this.toastrService.error('Invalid validation code');
      //   }
      // }, error => {
      //     if (error.error.errors.ConfirmPassword) {
      //       this.toastrService.error(error.error.errors.ConfirmPassword[0]);
      //     }
      //     if (error.error.errors.NewPassword) {
      //       this.toastrService.error(error.error.errors.NewPassword[0]);
      //     }
      // });
    }
  }

  private prepareToSend(): ResetPasswordModel {
    const formData = this.form.value;
    this.userLogin.VerificationCode = formData.verificationCode;
    this.userLogin.NewPassword = formData.password;
    this.userLogin.ConfirmPassword = formData.confirmPassword;
    this.userLogin.UserId = parseInt(this.UserId);
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
