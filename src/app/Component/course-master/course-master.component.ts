import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddUserComponent } from '../home/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog'
import { UserMasterService } from '../../Service/user-master.service';
import { MatTableModule } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../core/core.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddCourseComponent } from '../home/add-course/add-course.component';
import { CourseMasterService } from '../../Service/course-master.service';

@Component({
  selector: 'app-course-master',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule,AddUserComponent],
  templateUrl: './course-master.component.html',
  styleUrl: './course-master.component.css'
})
export class CourseMasterComponent implements OnInit{

  displayedColumns: string[] = [
    'name',
    'description',
    'fees',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private coursemasterService:CourseMasterService,private coreService:CoreService,private fb :FormBuilder,private cd:ChangeDetectorRef){}

  ngOnInit(): void {
      this.getCourseList();
        
  }

  openAddEditcourseForm(){
    const dialogRef =  this._dialog.open(AddCourseComponent);  
    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getCourseList();
       }
      },
    });
  }

  getCourseList(){
    this.coursemasterService.getCourseList().
      subscribe({
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          console.log(res);
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }

  deleteCourse(id:number){
    this.coursemasterService.deleteCourse(id).
    subscribe({
      next: (res)=>{
        this.getCourseList();
        this.cd.detectChanges();
      },
      error: (err)=>{
        console.log(err);
        this.coreService.openSnackBar("Can't delete course as the this course alocated to batches..", 'OK');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddCourseComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

}
