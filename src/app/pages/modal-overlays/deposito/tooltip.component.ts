import { Component, TemplateRef } from '@angular/core';
import { NbDialogService, NbMenuService } from '@nebular/theme';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { actividad } from '../../../interfaces';

@Component({
  selector: 'ngx-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['tooltip.component.scss'],
})
export class TooltipComponent {

  formulario: FormGroup;

  ngOnInit(): void {

    this.formulario.get("AGE_FECHA").patchValue(this.getFechaActual())

    this.datadeposito()

  }


  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {

    this.formulario = this.formBuilder.group({
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

  datadeposito() {
    this.service.getdeposito().subscribe(resp => {

      this.actividad = resp['deposito']['rows'];
      console.log("esto es data depos", this.actividad)

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

  actividad_deposito;

  registrardeposito(actividad) {

    this.actividad_deposito = actividad

    this.service.regdeposito(this.actividad_deposito).subscribe(data => {

      this.datadeposito()

    })





  }


}
