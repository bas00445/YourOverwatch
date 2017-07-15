import { Component } from '@angular/core';
import { OverviewTab } from '../tabs/overview-tab/overview';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  overviewTab = OverviewTab

  constructor() {

  }
}
