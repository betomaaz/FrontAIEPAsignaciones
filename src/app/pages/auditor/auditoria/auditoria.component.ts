import { NbDialogService, NbMenuService } from '@nebular/theme';
import { Component, TemplateRef } from '@angular/core';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { actividad } from '../../../interfaces';


@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./auditoria.component.scss'],
  templateUrl: './auditoria.component.html',
})
export class NotFoundComponent {

  form: FormGroup;

  ngOnInit(): void {

    this.form.get("AGE_FECHA").patchValue(this.getFechaActual())

    this.dataAuditor(this.getFechaActual())

    this.form.get("AGE_FECHA").valueChanges.subscribe(data => {
      this.dataAuditor({ AGE_FECHA: data });
    });
  }


  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      AGE_FECHA: [this.getFechaActual()]
    });
  }




  goToHome() {
    this.menuService.navigateHome();
  }


  getFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  actividad: actividad[] = [];

  dataAuditor(AGE_FECHA) {
    this.service.getAuditor(AGE_FECHA).subscribe(resp => {

      this.actividad = resp['auditor']['rows'];
      console.log(this.actividad)

    })
  }


  actividad_seleccionada;

  editarActividad(actividad, dialog: TemplateRef<any>, hora) {



    this.actividad_seleccionada = actividad


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
            hasBackdrop: true,

          });
      }
    );

  }

}
