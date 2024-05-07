import {Component} from '@angular/core';
import {LoadingService} from "./core/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sound Good';
  loading = this._loader.loading$;

  constructor(
    private _loader: LoadingService
  ) {
  }
}
