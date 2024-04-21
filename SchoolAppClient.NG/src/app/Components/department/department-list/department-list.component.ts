import { Component, OnInit } from '@angular/core';
import { DepartmentServices } from '../../../Services/department.service';
import { Router } from '@angular/router';
import { Department } from '../../../Models/department';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {

  public department: Department[] = [];
  public departmentId!: number;

  constructor(
    private departmentService: DepartmentServices, private router: Router) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.departmentService.getAllDepartment().subscribe(data => { this.department = data; })
  }
  deleteDepartment(id: number): void {
    if (confirm("Are you sure you want to delete this Department?")) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        this.department = this.department.filter(department => department.departmentId !== id);
      });
    }
  }
}
