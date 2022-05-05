import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-api-datatable';
  dtOptions: DataTables.Settings = {};
  data$: Observable<any> = new Observable;
  datas: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.dtOptions = {
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json',
      },
      pagingType: 'full_numbers'
    };

    this.httpClient
      .get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((data) => {
        this.datas = data;
        this.dtTrigger.next(data);
      });
  };

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe()
  }
}
