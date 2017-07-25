import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AppService} from '../../services/AppService';

@Component({
    selector: 'page-hero',
  templateUrl: 'hero.html'
})

export class HeroPage {

  constructor(public navCtrl: NavController,
              private appService: AppService,
              private navParams: NavParams ) {

    console.log(navParams);

  }


}