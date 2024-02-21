import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeServService } from '../services/employee-serv.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit{

  empForm: FormGroup;

  education : string []= ['Intermediate','Diploma','Graduate','Post Graduate'];

  constructor(private fb :FormBuilder,
     private empServ: EmployeeServService,
     private dialogRef: MatDialogRef<AddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data : any,
     ){

    this.empForm = this.fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      company:'',
      education:'',
      experience:'',
      package:'',
    })

  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this.empServ.editEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val : any)=>{
            alert("Updated record successfully");
            this.dialogRef.close(true);
          },
          error: (err : any)=>{
            console.log(err);
            
          }
        })

      }else{

        this.empServ.addEmployee(this.empForm.value).subscribe({
          next: (val : any)=>{
            alert("Added record successfully");
            this.dialogRef.close(true);
          },
          error: (err : any)=>{
            console.log(err);
            
          }
        })
      }
      
    }
  }
}
