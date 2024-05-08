import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiclienteService } from '../../services/apicliente.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cliente } from '../../Models/cliente';
import { Respuesta } from '../../Models/respuesta';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  

  public nombre :string;
  
  constructor( public dialogRef: MatDialogRef<DialogComponent>, 
    public apiCliente:ApiclienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
    ) {
      if(cliente != null)
        this.nombre= cliente.nombre;3 
   }
   close(){
    this.dialogRef.close();
  }
  
  addCliente(){
    const cliente: Cliente = {
      nombre: this.nombre,
      id:0
    };
    this.apiCliente.add(cliente).subscribe(Respuesta => {
      if(Respuesta.exito===1){
        this.dialogRef.close();
        this.snackBar.open("Cliente insertado con exito", "",{
          duration:2000
        });
      }
    });
  }
  editCliente(){
    const cliente: Cliente={nombre:this.nombre, id : this.cliente.id};
    this.apiCliente.edit(cliente).subscribe(Respuesta => {
      if(Respuesta.exito===1){
        this.dialogRef.close();
        this.snackBar.open("Cliente editado con exito", "",{
          duration:2000
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
