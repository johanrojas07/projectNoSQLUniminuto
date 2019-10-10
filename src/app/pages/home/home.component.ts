import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UsersComponent } from '../users/users.component';
import { MateriasComponent } from '../materias/materias.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openUser() {
    const dialogRef = this.dialog.open(UsersComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openMateria() {
    const dialogRef = this.dialog.open(MateriasComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
