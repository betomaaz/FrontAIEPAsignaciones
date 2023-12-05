import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { actividad } from '../../../interfaces';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  ngOnInit(): void {
    this.getFechaActual();
    this.obtenerActividad();
    console.log(this.actividad)
    console.log(this.getFechaActual())
  }


  formActividad = this.formBuilder.group({

    AGE_FECHA: [''],


  });

  form: FormGroup;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      firstName: {
        title: 'Nombres',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      username: {
        title: 'Usuario',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      age: {
        title: 'Rol',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: ActividadesService,
    private route: Router, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      AGE_FECHA: [this.getFechaActual()]
    });

  }

  actividad: actividad[] = [];

  obtenerActividad() {
    console.log(this.formActividad.value)
    this.service.getActividad(this.formActividad.value).subscribe(resp => {
      this.actividad = resp['actividad']['rows'];

      this.actividad.forEach(persona => {

        if (persona['actividades']) {
          // Comenzamos a buscar las horas
          // 
          persona['actividades'].forEach(actividad => {

            if (actividad != null) {
              persona['ACT_ESTADO'] = actividad['ACT_ESTADO']

              actividad['horas'].forEach(hora => {
                persona['HORA_' + hora] = actividad['ACT_NOMBRE']
              })
            }

          });
        }
      })
    })
  }



  onDeleteConfirm(event): void {
    if (window.confirm('¿Seguro que desea eliminar este usuario?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  getFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  }


  editarActividad(actividad) {
    console.log(actividad)
  }

  getEstado(actividad: any, hora) {
    if (actividad['HORA_' + hora] != undefined) {

      if (actividad.ACT_ESTADO == "Finalizada")
        return "Finalizada"

      if (actividad.ACT_ESTADO == "Pendiente")
        return "Pendiente"

      if (actividad.ACT_ESTADO == "Iniciada")
        return "Iniciada"

    }
    return "blanco";
  }

}
