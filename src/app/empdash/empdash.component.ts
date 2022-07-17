import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';
import {AfterViewInit,  ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-empdash',
  templateUrl: './empdash.component.html',
  styleUrls: ['./empdash.component.css']
})
export class EmpdashComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'phone', 'email','address','action'];
  dataSource:any;
  row:any;
  //dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog:MatDialog, private api:ApiService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllEmployee();
  }
  openDialog() {
    //  this.dialog.open(DialogComponent);
    //   width:'80%'
    this.dialog.open(DialogComponent,{
      width:'30%',
    }).afterClosed().subscribe(val =>{
       if(val ==='save'){
         this.getAllEmployee();
       }
    })
  }
  getAllEmployee()
  {
   this.api.getemployee()
   .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
    },
    error:(err)=>{
    alert("error while fetching the records!!")
    }
   })
  }
  editEmployee(element:any)
  {
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:element
    }).afterClosed().subscribe(val =>{
      if(val ==='update'){
        this.getAllEmployee();
      }
   })
  }
  deleteEmployee(id:number)
  {
   this.api.deleteEmployee(id)
   .subscribe({
    next:(res)=>{
      alert("Employee deleted successfully");
      this.getAllEmployee();
    },
    error:()=>{
      alert("error while deleting the record!!");
    }
   })
  }

}
