import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'app/models/auth-model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private validationMessages: { [key: string]: { [key: string]: string } };
  public form: FormGroup;
  private userLogin: LoginModel = new LoginModel();

  constructor(private authservice: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              ) 
    {
      this.validationMessages = {
        email: {
          required: 'Please enter email address.',
          email: 'Please enter valid email address.'
        },
        password: {
          required: 'Please enter password.'
        }
      };
    }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      //this.router.navigate(['/dashboard/']);
    }

    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email:  [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  public async onSave(): Promise<any> {
	try {
		if (this.form.invalid) {
			Object.keys(this.form.controls).forEach(field => {
			this.form.controls[field].markAsDirty();
			this.form.controls[field].markAsTouched();
		});
		} else {			
    
			const loginModel = this.prepareToSend();
			
			const username = loginModel.email;
			console.log(username);
			const password = loginModel.password;
			
			const user = await Auth.signIn(username, password);
			console.log(user);
			
			return user;
		}
    } catch (error) {
        console.log('error signing in', error);
    }

      // this.authService.login(this.prepareToSend()).subscribe(response => {
      //   if (response.userId != 0) {
      //     localStorage.setItem('token', response.userId);
      //     this.router.navigate(['/dashboard/']);
      //     this.toastrService.success(response.message);
      //   }
      //    else {
      //     this.toastrService.error('Invalid username or password');
      //   }
      // }, error => {
      //   this.toastrService.error("Network Error");
      // });
  }

  private prepareToSend(): LoginModel {
    const formData = this.form.value;
    this.userLogin.email = formData.email;
    this.userLogin.password = formData.password;
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
