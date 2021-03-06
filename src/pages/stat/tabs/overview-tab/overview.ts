import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppService} from '../../../../services/AppService';
import * as _ from 'lodash';

// Import Page //
import {HeroPage} from '../../../../pages/hero/hero';

@Component({
  selector: 'tab-overview',
  templateUrl: 'overview.html'
})

export class OverviewTab {
  public playerTag: any;
  public playerData: any;
  public playerHeroData: any;
  public winRate: any;
  public loseRate: any;

  public doughnutChartLabels: string[] = ['Win-rate', 'Lost-rate'];
  public winRateChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';

  public currentMode: string;
  public heroesPlayTime: any;
  public heroesPlayTimeAry: any[] = [];
  public totalPlayTime: any;


  constructor(public navCtrl: NavController,
              private appService: AppService) {

    this.playerTag = appService.currentUserTag.userStat;
    this.setMode('selectQP');
  }

  public getTotalPlayTime() {
    this.totalPlayTime = this.playerData.game_stats.time_played;
    return this.totalPlayTime
  }

  public getWinRate() {
    this.winRate = this.playerData.overall_stats.win_rate;
    this.loseRate = 100 - this.winRate;
  }

  public getHeroTimeList() {
    this.heroesPlayTimeAry = [];
    for (let key in this.heroesPlayTime) {
      if (Math.ceil(this.heroesPlayTime[key]) > 0) {
        // this.heroesPlayTimeAry.push({key: key, value: Math.ceil(this.heroesPlayTime[key])});
        this.pushTimeWithSorting(key, Math.ceil(this.heroesPlayTime[key]));
      }
    }
  }

  public pushTimeWithSorting(name, timeValue) {
    if (_.isEmpty(this.heroesPlayTimeAry)) {
      this.heroesPlayTimeAry.push({key: name, value: timeValue});
      return;
    } else {
      let insertIdx = 0;
      for (let i = 0; i < this.heroesPlayTimeAry.length; i++) {
        if (timeValue < this.heroesPlayTimeAry[i].value) {
          insertIdx += 1;
        } else {
          this.heroesPlayTimeAry.splice(insertIdx, 0, {key: name, value: timeValue});
          return;
        }
      }
    }
  }

  public setMode(event: string) {
    this.currentMode = event;
    this.loadDataByMode();
    this.getWinRate();
    this.getHeroTimeList();
    this.getTotalPlayTime();
  }

  public loadDataByMode() {
    if (this.currentMode === 'selectQP') {
      this.playerData = this.appService.currentUserTag.data.us.stats.quickplay;
      this.heroesPlayTime = this.appService.currentUserTag.heroStat.us.heroes.playtime.quickplay;
      // this.playerHeroData = this.appService.currentUserTag.heroStat.us.heroes.stats.quickplay;
    } else {
      this.playerData = this.appService.currentUserTag.data.us.stats.competitive;
      this.heroesPlayTime = this.appService.currentUserTag.heroStat.us.heroes.playtime.competitive;
      // this.playerHeroData = this.appService.currentUserTag.heroStat.us.heroes.stats.competitive;
    }
  }

  public getPercentTime(time) {
    return (time / this.heroesPlayTimeAry[0].value) * 100 + '%';
  }

  public goToHeroPage(heroName: string) {
    console.log('name:', heroName);
    let heroesData = this.appService.currentUserTag.heroStat.us.heroes;
    this.navCtrl.push(HeroPage, {
      heroesData: heroesData,
      selectedHero: heroName,
      mode: this.currentMode
    });
  }

}
