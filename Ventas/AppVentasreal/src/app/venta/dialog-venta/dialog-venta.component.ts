import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiVentaService } from '../../services/api-venta.service';
import { Venta } from 'src/app/Models/venta';
import { Concepto } from 'src/app/Models/concepto';
import { Observable } from 'rxjs';
import { Respuesta } from '../../Models/respuesta';


@Component({
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.scss']
})
export class DialogVentaComponent implements OnInit {
  public venta: Venta;
  public concepto: Concepto[];

  public conceptoForm = this.formbuilder.group({
    cantidad: [0, Validators.required],
    importe: [0, Validators.required],
    idProducto: [1, Validators.required]
  });

  constructor(
    public dialogref: MatDialogRef<DialogVentaComponent>,
    public snackBar: MatSnackBar,
    public apiVenta: ApiVentaService,
    private formbuilder: FormBuilder
  ) {
    this.concepto = [];
    this.venta = { IdCliente: 1, Concepto: [] };
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogref.close();
  }
  addConcepto(): void {
    this.concepto.push(this.conceptoForm.value)
  }
  addVenta(): void {
    this.venta.Concepto = this.concepto;
    this.apiVenta.add(this.venta).subscribe(Respuesta => {
      if (Respuesta.exito == 1) {
        this.dialogref.close();
        this.snackBar.open("Venta Insertada", "", {
          duration: 2000
        });
      } else
        console.log("NO se a logrado insertar venta")
    })
  }


}
