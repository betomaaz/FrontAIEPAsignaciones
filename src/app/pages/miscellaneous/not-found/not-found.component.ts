import { NbDialogService, NbMenuService } from '@nebular/theme';
import { Component } from '@angular/core';
import { ActividadesService } from '../../../services/actividades.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { actividad } from '../../../interfaces';

@Component({
  selector: 'ngx-not-found',
  styleUrls: ['./not-found.component.scss'],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {


  ngOnInit(): void {

    this.form.get("AGE_FECHA").valueChanges.subscribe(data => {

      this.dataAuditor({ AGE_FECHA: data })
    })
  }




  constructor(private menuService: NbMenuService,
    private service: ActividadesService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder) {


  }

  form: FormGroup;


  goToHome() {
    this.menuService.navigateHome();
  }


  actividad: actividad[] = [];

  dataAuditor(AGE_FECHA) {
    this.service.getAuditor(AGE_FECHA).subscribe(resp => {

      this.actividad = resp['auditor']['rows'];
      console.log(this.actividad)

    })
  }
}
