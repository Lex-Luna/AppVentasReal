import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { Respuesta } from '../Models/respuesta';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../Models/cliente';
import { DeleteDialogComponent } from '../common/Delete/delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})

export class ClienteComponent implements OnInit 
{
  public lst :any[];
  public columnas: string[]=["id","nombre","actions"];
  public width : string = "300px;" 

  constructor(private apiclienteService: ApiclienteService,
    public dialog : MatDialog, 
    public snacBar : MatSnackBar) 
  {
      

   }

  ngOnInit(): void {
    this.ClienteGet();
  }
  ClienteGet (){
      this.apiclienteService.getClientes().subscribe( respuesta =>{
      
      this.lst= respuesta.data;


    })
  }
  openAdd(){
    const dialogRef = this.dialog.open(DialogComponent,{
      width : this.width
    }
     ); 
    dialogRef.afterClosed().subscribe(result =>this.ClienteGet()
  )}
  openEdit(cliente: Cliente ){
    const dialogRef = this.dialog.open(DialogComponent,{
      width : this.width,
      data: cliente
    }); 
    dialogRef.afterClosed().subscribe(result =>this.ClienteGet()
  )}
  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      width : this.width
    }); 
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiclienteService.delete(cliente.id).subscribe(Respuesta=>{
          if(Respuesta.exito===1){
            this.snacBar.open("Cliente eliminado con exito","",{
              duration:2000
            })
            this.ClienteGet();
          }
        })
      }
    }) // Aquí es donde faltaba la llave de cierre
}
}