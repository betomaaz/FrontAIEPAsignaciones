import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { actividad } from '../../../interfaces';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  ngOnInit(): void {
    this.obtenerActividad();
    console.log(this.actividad)
  }

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
    private route: Router) {

  }

  actividad: actividad[] = [];

  obtenerActividad() {
    this.service.getActividad().subscribe(resp => {
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

  editarActividad(actividad){
    console.log(actividad)
  }

  getEstado(actividad: any, hora) {
    if (actividad['HORA_' + hora] != undefined) {

      if (actividad.ACT_ESTADO == "Pendiente")
        return "Pendiente"

      if (actividad.ACT_ESTADO == "Iniciada")
        return "Iniciada"

      if (actividad.ACT_ESTADO == "Finalizada")
        return "Finalizada"

    }
    return "blanco";
  }

}
