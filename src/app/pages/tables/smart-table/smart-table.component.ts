import { Component, OnInit, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { actividad } from '../../../interfaces';
import { Router } from '@angular/router';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  ngOnInit(): void {

    this.form.get("AGE_FECHA").patchValue(this.getFechaActual())

    this.obtenerActividad(this.getFechaActual())
    this.form.get("AGE_FECHA").valueChanges.subscribe(data => {

      this.obtenerActividad({ AGE_FECHA: data })
    })
  }



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
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      AGE_FECHA: [this.getFechaActual()]
    });

  }


  actividad: actividad[] = [];

  obtenerActividad(AGE_FECHA) {

    this.service.getActividad(AGE_FECHA).subscribe(resp => {
      this.actividad = resp['actividad']['rows'];

      this.actividad.forEach(persona => {

        if (persona['actividades']) {
          // Comenzamos a buscar las horas
          // 
          persona['actividades'].forEach(actividad => {

            if (actividad != null) {
              //  persona['ACT_ESTADO'] = actividad['ACT_ESTADO']

              actividad['horas'].forEach(hora => {
                persona['HORA_' + hora] = actividad['ACT_NOMBRE']
                persona['HORA_' + hora + '_ACT'] = actividad['ACT_ID']

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

  filtro() {

    console.log(this.form.value)

  }

  getFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  actividad_seleccionada;


  editarActividad(actividad, dialog: TemplateRef<any>, hora) {

    this.actividad_seleccionada = actividad['HORA_' + hora + '_ACT']

    // TODO LLAMAR SERVICIO POR DI DE LA ACTIVIDAD
    // Pasar el id actividad_seleccionada

    this.service.getModal({ ACT_ID: this.actividad_seleccionada }).subscribe(
      (data) => {

        const prueba = data;
        console.log('NOMBRE:', prueba['data_act']['rows']);

        this.dialogService.open(
          dialog,
          {
            context: prueba['data_act']['rows'],
            closeOnEsc: false,
          });
      }
    );


  }

  getEstado(actividad: any, hora) {
    const id = 'HORA_' + hora + '_ACT'
    if (actividad['HORA_' + hora] != undefined) {
      const actividad_id = actividad[id]

      let estado = "blanco"
      actividad.actividades.forEach(elemento => {

        if (elemento.ACT_ID == actividad_id) {
          estado = elemento['ACT_ESTADO']
          return
        }

      })

      return estado

    }
  }

}
