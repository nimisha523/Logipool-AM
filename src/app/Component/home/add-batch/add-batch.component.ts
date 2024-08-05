import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../../core/core.service';
import { BatchMasterService } from '../../../Service/batch-master.service';
import { UserMasterService } from '../../../Service/user-master.service';
import { CourseMasterService } from '../../../Service/course-master.service';

@Component({
  selector: 'app-add-batch',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule,MatButtonModule,MatToolbar,MatFormFieldModule,MatSelectModule,MatDialogModule,MatSnackBarModule],
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css']
})


export class AddBatchComponent implements OnInit {

  batchForm: FormGroup;
  trainers: any[] = [];
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private batchMasterService: BatchMasterService,
    private dialogRef: MatDialogRef<AddBatchComponent>,
    private coreService: CoreService,
    private userService: UserMasterService,
    private courseService: CourseMasterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.batchForm = this.fb.group({
      bname: ['', [Validators.required]],
      sdate: ['', [Validators.required]],
      edate: ['', [Validators.required]],
      trainer: ['', [Validators.required]],
      course: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(users => this.trainers = users);
    this.courseService.getCourseList().subscribe(courses => this.courses = courses);

    if (this.data) {
      this.batchForm.patchValue(this.data);
    }
  }

  // onFormSubmit() {
  //   if (this.batchForm.valid) {
  //     if (this.data) {
  //       this.batchMasterService.updateBatch(this.data.id, this.batchForm.value).subscribe({
  //         next: () => {
  //           this.coreService.openSnackBar('Batch details updated');
  //           this.dialogRef.close(true);
  //         },
  //         error: (err) => console.log(err)
  //       });
  //     } else {
  //       this.batchMasterService.addBatch(this.batchForm.value).subscribe({
  //         next: () => {
  //           console.log(this.batchForm)
  //           this.coreService.openSnackBar('Batch added successfully');
  //           this.dialogRef.close(true);
  //         },
  //         error: (err) => console.log(err)
  //       });
  //     }
  //   }
  // }

  onFormSubmit() {
    if (this.batchForm.valid) {
        const batchData = {
            ...this.batchForm.value,
            trainerId: this.batchForm.value.trainer,
            courseId: this.batchForm.value.course
        };

        if (this.data) {
            this.batchMasterService.updateBatch(this.data.bid, batchData).subscribe({
                next: () => {
                    this.coreService.openSnackBar('Batch details updated');
                    this.dialogRef.close(true);
                },
                error: (err) => console.log(err)
            });
        } else {
            this.batchMasterService.addBatch(batchData).subscribe({
                next: () => {
                    this.coreService.openSnackBar('Batch added successfully');
                    this.dialogRef.close(true);
                },
                error: (err) => console.log(err)
            });
        }
    }
}

}
