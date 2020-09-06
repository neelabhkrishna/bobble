import { Component, Input } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // For Template driven forms we have created variables.
  fname: string;
  lname: string;
  result: string ="";
  // To automate populate in JSON format
  @Input() user = {email: '', password: '' };

 ngOnInit(){
  
  // Facebook Log IN App configuration
  (window as any).fbAsyncInit = function() {
    FB.init({
      appId      : '336852060771280',
      cookie     : true,
      xfbml      : true,
      version    : 'v8.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 }
 // Reference of Data Service for manually sign UP
  constructor(public service: DataService){}
  submitform(){
    // Calling Service method
      this.service.postdata(this.user).subscribe((data: any[])=> {this.result="Registered Successfully"}); 
  }
  // Facebook Login Click Button
  submitLogin(){
    window['FB'].login((response) => {
      console.log('login response',response);
      if (response.authResponse) {

        window['FB'].api('/me', {
          // Fields for getting after login
          fields: 'last_name, first_name, email'
        }, (userInfo) => {

          console.log("user information");
          console.log(userInfo);
        });
         
      } else {
        console.log('User login failed');
      }
  }, {scope: 'email'});

  }

}
