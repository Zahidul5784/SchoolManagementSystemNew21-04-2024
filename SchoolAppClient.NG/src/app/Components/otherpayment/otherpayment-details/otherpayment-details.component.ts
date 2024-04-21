import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherPaymentService } from '../../../Services/othersPayment.service';

@Component({
  selector: 'app-otherpayment-details',
  templateUrl: './otherpayment-details.component.html',
  styleUrl: './otherpayment-details.component.css'
})
export class OtherpaymentDetailsComponent implements OnInit {

  otherPaymentId!: number;
  othepayment: any;

  constructor(
    private route: ActivatedRoute,
    private otherPayemntService: OtherPaymentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.otherPaymentId = +params['id'];
      this.getOtherypaymentDetails();
    });
  }

  getOtherypaymentDetails() {
    this.otherPayemntService.getOtherPayemtnById(this.otherPaymentId).subscribe(
      (data) => {
        this.othepayment = data;
        console.log(this.othepayment);
      },
      (error) => {
        console.error('Error fetching monthly payment details:', error);
      }
    );
  }
  printDetails(): void {
    window.print();
  }
}
