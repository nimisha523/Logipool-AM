import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    private userMasterService:UserMasterService, 
    private dialogRef: MatDialogRef<AddUserComponent>,
    private coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.userForm = this.fb.group({
      fname: ['', [ Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      lname: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z]*$'),
        Validators.minLength(2),
        Validators.maxLength(30)]],
      address: ['', [Validators.required ]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userMasterService.updateUser(this.data.uid, this.userForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('User details updated');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      } else {
        this.userMasterService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('User added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }
    }
  }
}
