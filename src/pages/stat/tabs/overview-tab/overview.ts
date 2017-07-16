import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../../../services/AppService';

@Component({
  selector: 'tab-overview',
  templateUrl: 'overview.html'
})

export class OverviewTab {
  public playerTag: any;
  public playerData: any;
  public winRate: any;
  public loseRate: any;

  public doughnutChartLabels: string[] = ['Win-rate', 'Lost-rate'];
  public winRateChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  public currentMode: string;

  constructor(public navCtrl: NavController,
              private appService: AppService) {

    this.playerTag = appService.currentUserTag.userStat;
    this.playerData = appService.currentUserTag.data;
    this.setMode('selectQP');
    this.getWinRate();
    this.generateDonutChart();
  }

  public generateDonutChart() {
    this.winRateChartData = [];
    this.winRateChartData.push(this.winRate);
    this.winRateChartData.push(this.loseRate);
  }

  public getWinRate() {
    this.winRate = this.playerData.overall_stats.win_rate;
    this.loseRate = 100 - this.winRate;
  }

  public setMode(event: string) {
    this.currentMode = event;
    this.loadDataByMode();
    this.getWinRate();
    this.generateDonutChart();
  }

  public loadDataByMode() {
    if (this.currentMode === 'selectQP') {
      this.playerData = this.appService.currentUserTag.data.us.stats.quickplay;
    } else {
      this.playerData = this.appService.currentUserTag.data.us.stats.competitive;
    }
  }

}
