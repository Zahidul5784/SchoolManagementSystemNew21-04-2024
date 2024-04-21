import { Component, OnInit } from '@angular/core';
import { Fee } from '../../../Models/fee';
import { Router } from '@angular/router';
import { FeeService } from '../../../Services/fee-service.service';

@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrl: './fee-list.component.css'
})
export class FeeListComponent implements OnInit {
  public fees!: Fee[];

  constructor(private feeService: FeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadFees();
  }

  loadFees() {
    this.feeService.getAllFees().subscribe(fees => {
      this.fees = fees;
    });
  }

  deleteFee(id: number): void {
    if (confirm("Are you sure you want to delete this fee?")) {
      this.feeService.deleteFee(id).subscribe(() => {
        // After successful deletion, remove the deleted fee from the list
        this.fees = this.fees.filter(fee => fee.feeId !== id);
      });
    }
  }

}
