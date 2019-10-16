import { StudentService } from './students.service';
import { MateriasService } from '../materias/materias.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // <- ADD THIS
})

export class StudentProvider {
  constructor(
    private studentService: StudentService,
    private materiasService: MateriasService,
  ) {}

  public getUserWithSubject(): Promise<any> {
    return new Promise((resolve, reject) => {
      let estudents = [];
      this.studentService.getUsersSync().then((estudentsData: any) => {
        const arrayPromise: Array<Promise<any>> = [];
        estudents = estudentsData;
        estudents.forEach((student) => {
          arrayPromise.push(this.studentService.getMateriasUser(student.id));
        });
        Promise.all(arrayPromise)
        .then((materia) => {
          // tslint:disable-next-line:no-shadowed-variable
          materia.forEach((materia, index) => {
            estudents[index].materias = materia;
          });
          resolve(estudents);
        })
        .catch((error) => {
          reject(error);
        });
      });
    });
  }

}