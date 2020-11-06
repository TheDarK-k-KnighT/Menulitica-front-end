import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpModel } from 'app/models/auth-model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  private validationMessages: { [key: string]: { [key: string]: string } };
  public form: FormGroup;
  private signUpModel: SignUpModel = new SignUpModel();

  constructor(private authservice: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              ) {
      this.validationMessages = {
        restaurant_name: {
          required: 'Please enter your restaurant name.',
        },
        restaurant_owner_name: {
          required: 'Please enter your/owner name.'
        },
        restaurant_address: {
          required: 'Please enter your restaurant address.',
        },
        restaurant_pancard: {
          required: 'Please enter restaurant pancard.'
        },
        number_of_tables: {
          required: 'Please enter number of tables.',
        },
        number_of_seats: {
          required: 'Please enter number of seats.'
        },
        user_subscription: {
          required: 'Please select subscription plan.',
        },
        payment: {
          required: 'Please enter your payment.'
        },
        mobile_no: {
          required: 'Please enter your mobile number.'
        },
        email: {
          required: 'Please enter your email.'
        },
        password: {
          required: 'Please enter your password.'
        },
      };
    }

  ngOnInit() {
    if (this.authservice.isLoggedIn()) {
      // this.router.navigate(['/dashboard/']);
    }

    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      restaurant_name:  [null, [Validators.required]],
      restaurant_owner_name: [null, [Validators.required]],
      restaurant_address:  [null, [Validators.required]],
      restaurant_pancard: [null, [Validators.required]],
      mobile_no: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      number_of_tables:  [null, [Validators.required]],
      number_of_seats: [null, [Validators.required]],
      user_subscription:  [null, [Validators.required]],
      // user_subscription_expiry: [null, [Validators.required]],
      payment: [null, [Validators.required]]
    });
  }

  public async onSave() : Promise<any>{
	try {
		if (this.form.invalid) {
			this.toastr.warning("Please enter your details.");
			Object.keys(this.form.controls).forEach(field => {
				this.form.controls[field].markAsDirty();
				this.form.controls[field].markAsTouched();
		});
		} else {
			const signupModel = this.prepareToSend();
			
			this.authservice.signup(signupModel).subscribe(async response => {
				//console.log(response);
				if (response.success) {
				
					const username = signupModel.email;
					console.log(username);
					const password = signupModel.password;
					const email = signupModel.email;
					const phone_number = signupModel.mobile_no;
					
					const { user } = await Auth.signUp({
						username: username,
						password: password,
						attributes: {
							email: email,          // optional
							phone_number: phone_number,   // optional - E.164 number convention
							// other custom attributes 
						}
					});
					console.log(user);	
			
			
					this.router.navigate(['/login']);
					this.toastr.success(response.message);

					return user;
				}
				else {
					this.toastr.error('Something went wrong, Please try again. ' + response.message);
				}
			}, error => {
				this.toastr.error("Network Error");
			});
		}
	} catch (error) {
			console.log('error signing up:', error);
	}
  }

  private prepareToSend(): SignUpModel {
    const formData = this.form.value;
    this.signUpModel.number_of_seats = parseInt(formData.number_of_seats);
    this.signUpModel.number_of_tables = parseInt(formData.number_of_tables);
    this.signUpModel.payment = formData.payment;
    this.signUpModel.restaurant_address = formData.restaurant_address;
    this.signUpModel.restaurant_name = formData.restaurant_name;
    this.signUpModel.restaurant_owner_name = formData.restaurant_owner_name;

    this.signUpModel.restaurant_pancard = formData.restaurant_pancard;
    this.signUpModel.user_subscription = formData.user_subscription;
    this.signUpModel.email = formData.email;
    this.signUpModel.password = formData.password;
    this.signUpModel.mobile_no = formData.mobile_no;
    this.signUpModel.user_subscription_expiry = formData.user_subscription + 1;
    return this.signUpModel;
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
