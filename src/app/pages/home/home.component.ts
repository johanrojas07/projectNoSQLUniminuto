import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MateriasComponent } from '../materias/materias.component';
import { StudentsComponent } from '../students/students.component';
import { StudentProvider } from 'src/app/providers/students/students.provider';
import { MateriasService } from 'src/app/providers/materias/materias.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentsAndSubjects: any = [];
  objectMaterias = {};

  resultsLength = 0;
  data: any[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'materias', 'action'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private studentProvider: StudentProvider,
              private materiasService: MateriasService) { }

  ngOnInit() {
    this.getDataMaterias();
    
  }

  openUser() {
    const dialogRef = this.dialog.open(StudentsComponent, {
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

  getDataStudentsAndSubjects() {
    this.studentProvider.getUserWithSubject()
    .then((data) => {
      data.forEach(element => {
        let textMaterias = '';
        element.materias.forEach((materias) => {
          if (this.objectMaterias[materias.id].nombre) {
            if (textMaterias === '') {
              textMaterias = textMaterias + this.objectMaterias[materias.id].nombre + ' -NRC: ' + this.objectMaterias[materias.id].nrc;
            } else {
              // tslint:disable-next-line:max-line-length
              textMaterias = textMaterias + ', ' + this.objectMaterias[materias.id].nombre + ' -NRC: ' + this.objectMaterias[materias.id].nrc;
            }
          }
        });
        element.textMaterias = textMaterias;
      });
      console.log("DATA", data);
      this.data = data;
    });
  }

  getDataMaterias() {
    this.materiasService.getMaterias().subscribe((data) => {
      data.forEach((materiasData: any) => {
        this.objectMaterias[materiasData.payload.doc.id] =  materiasData.payload.doc.data();
      });
      this.getDataStudentsAndSubjects();
    });
  }

}
