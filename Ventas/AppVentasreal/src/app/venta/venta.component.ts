import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogVentaComponent } from './dialog-venta/dialog-venta.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  readonly width: string = "600px"
  constructor(
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  openAdd(): void {
    const dialogref = this.dialog.open(DialogVentaComponent, {
      width: this.width
    });
  }

}
