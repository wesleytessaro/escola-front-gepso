import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Sensor from '../shared/models/sensor-model';
import Atuador from '../shared/models/atuador-model';
import CsvSensor from '../shared/models/csv-sensor-model';
import CsvAtuador from '../shared/models/csv-atuador-model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  readonly baseUrl = 'https://escola-backend-gepso.herokuapp.com/escola/stock/';

  constructor(private http: HttpClient) { }

  async getSensor(): Promise<Sensor> {
    return this.http.get<Sensor>(`${this.baseUrl}/lastSensor`).toPromise();
  }
  async getAtuador(): Promise<Atuador> {
    return this.http.get<Atuador>(`${this.baseUrl}/lastAtuador`).toPromise();
  }
  async getCsvSensor(): Promise<CsvSensor> {
    return this.http.get<CsvSensor>(`${this.baseUrl}/findAllSensorByDates?fromDate=00000000&toDate=00000000`).toPromise();
  }
  async getCsvAtuador(): Promise<CsvAtuador> {
    return this.http.get<CsvAtuador>(`${this.baseUrl}/findAllActuatorByDates?fromDate=00000000&toDate=00000000`).toPromise();
  }

}
