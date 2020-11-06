import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from 'app/models/auth-model';
import { Observable } from 'rxjs';
import { Auth } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // signupUrl = ' https://nsel137ovb.execute-api.ap-south-1.amazonaws.com/Development/signin';
   private signupUrl = 'https://nsel137ovb.execute-api.ap-south-1.amazonaws.com/Development/signin';

  constructor(private httpClient: HttpClient) { }

  signup(signup: SignUpModel): Observable<any> {
	  
	 return this.httpClient.post(this.signupUrl, signup);
  }

  isLoggedIn() {
    return true;
  }
}
