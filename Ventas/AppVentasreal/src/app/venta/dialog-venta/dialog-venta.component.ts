import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss']
})
export class DialogVentaComponent implements OnInit {

  constructor(
    public dialogref: MatDialogRef<DialogVentaComponent>,
    public snackBar: MatSnackBar,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogref.close();
  }

}
