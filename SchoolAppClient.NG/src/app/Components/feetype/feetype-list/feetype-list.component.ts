import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeeTypeService } from '../../../Services/feetype.service';
import { Router } from '@angular/router';
import { FeeType } from '../../../Models/FeeType';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-feetype-list',
  templateUrl: './feetype-list.component.html',
  styleUrl: './feetype-list.component.css'
})
export class FeetypeListComponent implements OnInit {

  feeTypes: FeeType[] = [];
  searchfeeTypeId: number | undefined;

  constructor(
    private feeTypeService: FeeTypeService,
    private router: Router, private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFeeTypes();
  }

  getFeeTypes(): void {
    this.feeTypeService.getFeeTypes().subscribe(data => {
      this.feeTypes = data;
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this fee type?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteFeeType(id);
      }
    });
  }

  deleteFeeType(id: number): void {
    this.feeTypeService.deleteFeeType(id).subscribe(() => {
      // After successful deletion, remove the deleted fee type from the list
      this.feeTypes = this.feeTypes.filter(feeType => feeType.feeTypeId !== id);
    });
  }
}
