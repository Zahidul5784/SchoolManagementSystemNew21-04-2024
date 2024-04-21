import { Component, OnInit } from '@angular/core';
import { OthersPayment } from '../../../Models/OthersPayment';
import { OtherPaymentService } from '../../../Services/othersPayment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherpayment-list',
  templateUrl: './otherpayment-list.component.html',
  styleUrl: './otherpayment-list.component.css'
})
export class OtherpaymentListComponent implements OnInit {
  otherPayments: OthersPayment[] = [];
  searchName: string = '';

  constructor(private otherPaymentService: OtherPaymentService, private router: Router) { }

  ngOnInit(): void {
    this.loadOtherPayments();
  }

  loadOtherPayments(): void {
    this.otherPaymentService.getOtherPayments().subscribe(otherPayments => {
      this.otherPayments = otherPayments;
    });
  }
  get filteredPayments() {
    return this.otherPayments.filter(payment => payment.student.studentName.toLowerCase().includes(this.searchName.toLowerCase()));
  }
  deleteOtherPayment(id: number): void {
    this.otherPaymentService.deleteOthersPayment(id).subscribe(() => {

      this.otherPayments = this.otherPayments.filter(mp => mp.othersPaymentId !== id);
      console.log(`others payment with ID ${id} deleted successfully.`);
    }, error => {
      console.error(`Error deleting others payment with ID ${id}: ${error}`);
    });
  }
}
