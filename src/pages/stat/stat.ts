import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html'
})


export class StatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param

    this.playerTag = navParams.get('userStat');
    this.playerData = navParams.get('data');
    this.getWinRate();
    this.generateDonutChart();
  }

  public playerTag: any;
  public playerData: any;
  public winRate: any;
  public loseRate: any;

  public doughnutChartLabels:string[] = ['Win-rate', 'Lost-rate'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public generateDonutChart(){
    this.doughnutChartData.push(this.winRate);
    this.doughnutChartData.push(this.loseRate);
  }

  public getWinRate(){
    this.winRate = this.playerData.us.stats.competitive.overall_stats.win_rate;
    this.loseRate = 100 - this.winRate;
  }


}
