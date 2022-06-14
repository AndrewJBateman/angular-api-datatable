import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { CountryService } from './services/country.service';
import { CountryListInterface } from './interfaces/country.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-api-datatable';
  dtOptions: DataTables.Settings = {};
  countries: CountryListInterface[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private countryService: CountryService) {}

  // set up table options: defaults: paging, ordering = true
  ngOnInit() {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json',
      },
      pagingType: 'full_numbers',
      responsive: true,
    };

    this.getCountryList('all?fields=name,capital,region,cca2');
  }

  // get country list and subscribe, new table triggered with new data each RouterTestingModule
  getCountryList = (url: string): void => {
    this.countryService
      .fetchCountryList(url)
      .subscribe((data: CountryListInterface[]) => {
        this.countries = data;
        this.dtTrigger.next(data);
      });
  };

  // Table data unsubscribed in OnDestroy lifecycle
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
