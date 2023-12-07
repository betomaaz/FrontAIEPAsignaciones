import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private service: ActividadesService) {


    this.service.getEstadistica().subscribe(resultado => {
      const pieEst = resultado['estadistica']['rows']
      let array = []
      pieEst.forEach(element => {
        array.push(element['cuenta'])
        console.log(element['cuenta'])
      }

      )
      console.log(array)
      this.displayEstaditica(array)
    })


  }

  displayEstaditica(estadistica) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Finalizada', 'Iniciada', 'Pendiente'],
        datasets: [{
          data: estadistica, backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    }
    )

  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
