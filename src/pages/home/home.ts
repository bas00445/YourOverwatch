import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {AppService} from '../../services/AppService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newJSONTag: any;
  newTagName: string;
  newTagID: string;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController,
              private appService: AppService,
              private http: Http) {

  }

  public getNewBattleTagData(){
    this.http.get('https://owapi.net/api/v3/u/' + this.newTagName
      + '-' + this.newTagID + '/stats').subscribe(
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
    this.appService.listOfPlayerTags.push({name: this.newTagName,
      id: this.newTagID,
      data: this.newJSONTag});

    this.newTagName = this.newTagID = '';
    console.log(this.appService);

  }

}
