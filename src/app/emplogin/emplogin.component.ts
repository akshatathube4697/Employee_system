import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emplogin',
  templateUrl: './emplogin.component.html',
  styleUrls: ['./emplogin.component.css']
})
export class EmploginComponent implements OnInit {
  
  loginForm!:FormGroup
  constructor(private formBuilder:FormBuilder, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  //login method
  login(){
     this._http.get<any>("http://localhost:3000/empregister").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("login successfull");
        this.loginForm.reset();
        this.router.navigate(['empdash'])
      }else{
        alert("User not found");
      }
     })
  }
}
