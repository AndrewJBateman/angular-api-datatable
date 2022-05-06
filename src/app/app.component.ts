import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { CountryService } from './services/country.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-api-datatable';
  dtOptions: DataTables.Settings = {};
  // data$: Observable<any> = new Observable();
  // datas: any = [];
  countries: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private countryService: CountryService) {}

  // set up table options: defaults: paging, ordering = true
  ngOnInit() {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json',
      },
      pagingType: 'full_numbers',
      responsive: true,
    };

    this.getCountryList('all?');
  }

    // get country list and subscribe, new table triggered with new data each RouterTestingModule
    getCountryList = async (url: string) => {
      this.countryService.fetchCountryList(url).subscribe((data: any) => {
        this.countries = data;
        console.log('countries: ', this.countries);
        this.dtTrigger.next(data);
      });
    };

    // Table data unsubscribed in OnDestroy lifecycle
    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
}
