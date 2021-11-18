import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Sensor from '../shared/models/sensor-model';
import Atuador from '../shared/models/atuador-model';
import CsvSensor from '../shared/models/csv-sensor-model';
import CsvAtuador from '../shared/models/csv-atuador-model';
import ThinkSpeak from '../shared/models/thinkspeak-model';
@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  readonly baseUrl = 'https://escola-backend-gepso.herokuapp.com/escola/stock/';
  readonly thinkSpeakUrl = 'https://api.thingspeak.com/channels/1568475/feed/last.json?api_key=CPBF4FB5L5BZZ98A'
  constructor(private http: HttpClient) { }

  async getSensor(): Promise<Sensor> {
    return this.http.get<Sensor>(`${this.baseUrl}/lastSensor`).toPromise();
  }
  async getCaixaDgua(): Promise<ThinkSpeak> {
    return this.http.get<ThinkSpeak>(`${this.thinkSpeakUrl}`).toPromise();
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
  async getCsvSensorD(date_from:string,date_to:string): Promise<CsvSensor> {
    return this.http.get<CsvSensor>(`${this.baseUrl}findAllSensorByDates?fromDate=${date_from}&toDate=${date_to}`).toPromise();
  }
  async getCsvAtuadorD(date_from:string,date_to:string): Promise<CsvAtuador> {
    return this.http.get<CsvAtuador>(`${this.baseUrl}findAllActuatorByDates?fromDate=${date_from}&toDate=${date_to}`).toPromise();
  }
}
