import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
 
  employeeForm!:FormGroup;
  actionBtn:string="Save"
  constructor(private formBuilder:FormBuilder, 
    private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name:['',Validators.required],
      phone:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required, Validators.email]],
      address:['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Update";
      this.employeeForm.controls['name'].setValue(this.editData.name);
      this.employeeForm.controls['phone'].setValue(this.editData.phone);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['address'].setValue(this.editData.address);
    }
  }
  addEmployee()
  {
  if(!this.editData)
  {
    if(this.employeeForm.valid){
      this.api.postemployee(this.employeeForm.value)
      .subscribe({
        next:(res)=>{
          alert("employee added successfully");
          this.employeeForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding the product");
        }
      })
    };
  }else{
    this.updateEmployee();
  }
  }
  updateEmployee()
  {
   this.api.putEmployee(this.employeeForm.value,this.editData.id)
   .subscribe({
    next:(res)=>{
      alert("Employee updated successfully");
      this.employeeForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("error while updating the record");
    }
   })
  }

}
