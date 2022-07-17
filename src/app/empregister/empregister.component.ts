import { HttpClient }from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empregister',
  templateUrl: './empregister.component.html',
  styleUrls: ['./empregister.component.css']
})
export class EmpregisterComponent implements OnInit {

  signupForm!:FormGroup
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[''],
      mobile:[''],
      email:[''],
      password:['']
    })
  }
//make method to create user
signUp(){
this._http.post<any>("http://localhost:3000/empregister",this.signupForm.value).subscribe(res=>{
  alert("registration successfully");
  this.signupForm.reset();
  this.router.navigate(['login'])
},err=>{
  alert("wrong");
}
)
}
}
