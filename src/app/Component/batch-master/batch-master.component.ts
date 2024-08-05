
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from '../../core/core.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddBatchComponent } from '../home/add-batch/add-batch.component';
import { BatchMasterService } from '../../Service/batch-master.service';
@Component({
  selector: 'app-batch-master',
  standalone: true,
  imports: [FormsModule, CommonModule,MatPaginator,MatSort,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatToolbar,MatIconModule,MatTableModule,MatSnackBarModule,MatSlideToggleModule,AddBatchComponent],
  templateUrl: './batch-master.component.html',
  styleUrl: './batch-master.component.css'
})



export class BatchMasterComponent implements OnInit{

  displayedColumns: string[] = [
    'bname',
    'sdate',
    'edate',
    'trainer',
    'course',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,private batchmasterService:BatchMasterService,private coreService:CoreService,private fb :FormBuilder,private cd:ChangeDetectorRef){}

  ngOnInit(): void {
      this.getBatchList();
        
  }

  openAddEditBatchForm(){
    const dialogRef =  this._dialog.open(AddBatchComponent);  
    dialogRef.afterClosed().
    subscribe({
      next: (val)=>{
       if(val){
        this.getBatchList();
       }
      },
    });
  }

  getBatchList(){
    this.batchmasterService.getBatchList().
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

  deleteBatch(id: number) {
    this.batchmasterService.deleteBatch(id).subscribe({
      next: (res) => {
        this.getBatchList();
        this.cd.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.coreService.openSnackBar("Can't delete batch ", 'OK');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddBatchComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBatchList();
        }
      },
    });
  }
  
}
