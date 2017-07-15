import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {AppService} from '../../services/AppService';
import {TabsPage} from '../stat/tabs/tabs';

import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newJSONTag: any;
  newFullTag: string;
  newTagID: string;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController,
              private appService: AppService,
              private http: Http) {
      this.newFullTag = 'OverTone-11619';
  }

  public getNewBattleTagData(){
    this.http.get('https://owapi.net/api/v3/u/' + this.newFullTag + '/stats').subscribe(
      (response) => {
        this.newJSONTag = response.json();
        this.addNewBattleTag();
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
      }
    );

    this.isLoading = true;
  }

  public addNewBattleTag(){
    let separate = _.split(this.newFullTag, '-', 2);
    let newTagName = separate[0], newTagID = separate[1];

    this.appService.listOfPlayerTags.push(
      { userStat: {name: newTagName,
                     id: newTagID},
            data: this.newJSONTag
      });

    this.newFullTag = '';
    console.log(this.appService);

  }

  public goToUserStatPage(userTag){
    this.appService.currentUserTag = userTag;
    this.navCtrl.setRoot(TabsPage);
  }
}
