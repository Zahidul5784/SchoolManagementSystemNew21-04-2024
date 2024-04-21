import { Component, OnInit } from '@angular/core';
import { MonthlyPayment } from '../../../Models/monthly-payment';
import { Student } from '../../../Models/student';
import { Standard } from '../../../Models/standard';
import { CommonServices } from '../../../Services/common.service';
import { OthersPayment } from '../../../Models/OthersPayment';

@Component({
  selector: 'app-payment-details-per-student',
  templateUrl: './payment-details-per-student.component.html',
  styleUrls: ['./payment-details-per-student.component.css']
})
export class PaymentDetailsPerStudentComponent implements OnInit {
  payments: MonthlyPayment[] = [];
  otherPayment: OthersPayment[] = [];
  studentId!: number;
  public students: Student[] = [];
  public standards: Standard[] = [];
  filteredStudents: Student[] = [];
  public selectedStandardId: string = '';


  constructor(private commonService: CommonServices) { }

  ngOnInit(): void {
    // Fetch the standards and students data when the component initializes
    this.fetchStandards();
    this.fetchStudents();
  }

  onSubmit(): void {
    // Perform any action on form submission, such as fetching payments
    this.getPaymentsByStudentId();
  }

  onStandardChange(): void {
    // Filter students based on the selected standard
    if (this.selectedStandardId) {
      this.filteredStudents = this.students.filter(student => student.standardId === parseInt(this.selectedStandardId));
    } else {
      // If no standard is selected, show all students
      this.filteredStudents = this.students;
    }
  }

  fetchStandards(): void {
    this.commonService.getAllStandards().subscribe({
      next: (data: Standard[]) => {
        this.standards = data;
      },
      error: (error) => {
        console.error('Error occurred while fetching standards:', error);
      }
    });
  }

  fetchStudents(): void {
    this.commonService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.filteredStudents = data; // Initially, show all students
      },
      error: (error) => {
        console.error('Error occurred while fetching students:', error);
      }
    });
  }
  

  getPaymentsByStudentId(): void {
    if (this.studentId) {
      this.commonService.getAllPaymentsByStudentId(this.studentId)
        .subscribe(payments => this.payments = payments);
    } else {
      console.error("Student ID is not set.");
    }
  }

  getOtherPaymentByStudentId(): void {
    if (this.studentId) {
      this.commonService.getAllOtherPaymentsByStudentId (this.studentId)
        .subscribe(otherpayments => this.otherPayment = otherpayments);
    } else {
      console.error("Student ID is not set.");
    }


  }
  
}






