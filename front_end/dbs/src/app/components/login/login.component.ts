import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginResult } from 'src/app/entities/login-result';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(protected http: HttpClient) { }

  username: string = ""
  password: string = ""

  ngOnInit() {} 
  
  private readonly IPADDRESS: string = ""
  private readonly LOGIN_ENDPOINT: string = this.IPADDRESS +  "/Login"
  private readonly USERNAME: string = "username"
  private readonly PASSWORD: string = "password"

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    crossDomain: true,
  };

  login(){
    if (this.validateLogin){
      console.log("test")
      console.log(this.username)
      var loginObs : Observable<LoginResult> = this.connectLogin(this,username, this.password)
      loginObs.subscribe(loginResult => {
        if (loginResult.login_status){
          // move to new page
        } else {
          // show error login
        }
      })
    } else {
      // show error
    }
  }

  // connects to login endpoint and listens for true and false
  connectLogin(username, password): Observable<LoginResult>{
    let params = {}
    params[this.USERNAME] = username
    params[this.PASSWORD] = password
    return this.http.post<LoginResult>(this.LOGIN_ENDPOINT, params, this.httpOptions)
  }
  
  validateLogin(username, password){
     return true
  }
}
