import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeServService } from './services/employee-serv.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud_with_angular-material';

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','company',
  'education','experience','package','actionBtn'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _dialog : MatDialog, private empServ: EmployeeServService ){

  }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditForm(){
    let dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }

  openEditForm(data : any){
    let dialogRef = this._dialog.open(AddEditComponent,{
      data : data
    });

    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
    
  }

  getEmployeeList(){
    this.empServ.getAllEmployee().subscribe({
      next:(val:any)=>{
        console.log(val);
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      error:(err)=>{
        console.log(err);
        
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

  deleteEmpById(id : any){
     this.empServ.deleteById(id).subscribe({
      next:(res)=>{
         alert("deleted successfully!!!");
         this.getEmployeeList();
      },
      error:(err)=>{
        console.log(err);
        
      }
     })
  }
}
