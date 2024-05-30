import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private graphResult = new BehaviorSubject<number>(0);
  getGraphResult = this.graphResult.asObservable();

  constructor() {
  }

  setGraphResult(graphResultValue: number) {
    this.graphResult.next(graphResultValue)
  }
}
