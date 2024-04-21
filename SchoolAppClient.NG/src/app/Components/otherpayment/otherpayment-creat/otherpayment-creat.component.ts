import { Component, OnInit } from '@angular/core';
import { OthersPayment } from '../../../Models/OthersPayment';
import { CommonServices } from '../../../Services/common.service';
import { Router } from '@angular/router';
import { OtherPaymentService } from '../../../Services/othersPayment.service';
import { Student } from '../../../Models/student';
import { Standard } from '../../../Models/standard';
import { Fee } from '../../../Models/fee';

@Component({
  selector: 'app-otherpayment-creat',
  templateUrl: './otherpayment-creat.component.html',
  styleUrl: './otherpayment-creat.component.css'
})
export class OtherpaymentCreatComponent implements OnInit {

  public model: OthersPayment = new OthersPayment();
  public students: Student[] = [];
  public standards: Standard[] = [];
  public fee: Fee[] = [];

  public selectedStandardId: string = '';
  public totalAmount: number = 0; 

  constructor(
    private commonService: CommonServices,
    private otherPaymentService: OtherPaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.model = new OthersPayment();
    this.fetchFees();
    this.fetchStandards();
    this.fetchStudents();

  }


  //calculateTotalAmount(): number {
  //  let totalAmount = 0;
   
  //  for (const fee of this.filteredData.fees) {
  //    totalAmount += fee.amount;
  //  }

  //  return totalAmount;
  //}


  fetchFees(): void {
    this.commonService.getAllFees().subscribe({
      next: (data: Fee[]) => {
        this.fee = data;
      },
      error: (error) => {
        console.error('Error occurred while fetching fees:', error);
      }
    });
  }

  onSubmit(): void {

    this.otherPaymentService.createOthersPayment(this.model).subscribe({
      next: (createdPayment) => {
        // Assuming createdPayment contains the details of the newly created monthly payment
        this.router.navigate(['/otherpayment']);
      },
      error: (err) => {
        console.error('Error occurred while adding payment:', err);
      }
    });
  }

  fetchStudents(): void {
    this.commonService.getAllStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error occurred while fetching students:', error);
      }
    });
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

  get filteredData(): { students: Student[], fees: Fee[] } {
    if (!this.selectedStandardId.trim()) {
      return { students: this.students, fees: this.fee }; 
    }

    const filteredStudents = this.students.filter(student => student.standardId.toString() === this.selectedStandardId);
    const filteredFees = this.fee.filter(fee => fee.standardId.toString() === this.selectedStandardId && fee.paymentFrequency !== 'Monthly');

    return { students: filteredStudents, fees: filteredFees };
  }
}
