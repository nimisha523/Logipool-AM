import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserMasterService } from '../../../Service/user-master.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../../core/core.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{

  userForm:FormGroup;

  user: string[]=[
    'Java',
    'DotNet',
    'Python',
    'Testing'
  ]

  constructor(
    private fb:FormBuilder , 
    private usermasterService:UserMasterService, 
    private dialogRef: MatDialogRef<AddUserComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.userForm = this.fb.group({
      firstName:'',
      lastName:'',
      address:'',
      phoneNo:'',
      email:'',
      subject:''

    })
  }

  ngOnInit(): void {
      this.userForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this.usermasterService.updateUser(this.data.id, this.userForm.value).
        subscribe({
           next:(val:any) => {
            //  alert('User detailed updated');
             this.coreService.openSnackBar('User detailed updated');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }else{
        this.usermasterService.addUser(this.userForm.value).
        subscribe({
           next:(val:any) => {
            //  alert('User added successfully...');
             this.coreService.openSnackBar('User added successfully...');
             this.dialogRef.close(true);
          },
          error: (err:any) => {
              console.log(err);
          }
        });
      }
      
    }
  }
}
