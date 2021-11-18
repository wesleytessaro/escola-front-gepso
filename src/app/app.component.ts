import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Sensor from 'src/app/shared/models/sensor-model';
import Atuador from 'src/app/shared/models/atuador-model';
import Csv_sensor from 'src/app/shared/models/csv-sensor-model';
import Csv_atuador from 'src/app/shared/models/csv-atuador-model';
import { RelatorioService } from './relatorio/relatorio.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { Observable, interval, Subscription } from 'rxjs';
import ThinkSpeak from './shared/models/thinkspeak-model';



 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private updateSubscription: Subscription;

  sensor=new Sensor ();
  atuador=new Atuador ();
  csv_sensor=new Csv_sensor();
  csv_atuador=new Csv_atuador();
  thinkspeak=new ThinkSpeak();
  title = 'Dashboard Escola';
  dataTemperatura_atm;
  dataUmidade_atm;
  dataPressao;
  dataLuminosidade;
  dataTemperaturaSolo;
  dataCondutividade;
  dataUmidadeSolo;
  dataLaminaAtuador;
  labelDateTime;
  mensagem: string = 'Hello Worldaaa';
  secondes: number = 0;
  //time$: Date;

  constructor(private router: Router,private http:HttpClient,private relatorioService: RelatorioService){

  }
  ngOnInit(): void {
    this.fetchSensor();
    this.fetchAtuador();
    this.fetchCsvSensor();
    this.fetchCsvAtuador();
    this.updateSubscription = interval(5000).subscribe(
      (val) => { this.fetchSensor();
        this.fetchAtuador();
        this.fetchCsvSensor();
        this.fetchCsvAtuador();
        this.fetchThinkSpeak();
    }

);

  }
  async fetchThinkSpeak(): Promise<void> {
    this.thinkspeak = await this.relatorioService.getCaixaDgua();
  }
  async fetchSensor(): Promise<void> {
    this.sensor = await this.relatorioService.getSensor();
  }
  async fetchAtuador(): Promise<void> {
    this.atuador = await this.relatorioService.getAtuador();
  }
  async fetchCsvSensor(): Promise<void> {
    this.csv_sensor = await this.relatorioService.getCsvSensor();

    let labelDateTime=this.csv_sensor.datetime;
    labelDateTime='"'+labelDateTime.slice(0, -1)+'"';
    labelDateTime="["+labelDateTime.replace(/[',]+/g, '","')+"]";
    this.labelDateTime=labelDateTime;
    //Temperatura
    let dataTemperaturaATM=this.csv_sensor.temperatura_atm;
    dataTemperaturaATM='"'+dataTemperaturaATM.slice(0, -1)+'"';
    dataTemperaturaATM="["+dataTemperaturaATM.replace(/[',]+/g, '","')+"]";
    //Umidade
    let dataUmidade=this.csv_sensor.umidade_atm;
    dataUmidade='"'+dataUmidade.slice(0, -1)+'"';
    dataUmidade="["+dataUmidade.replace(/[',]+/g, '","')+"]";
    //Pressao
    let dataPressao=this.csv_sensor.pressao_atm;
    dataPressao='"'+dataPressao.slice(0, -1)+'"';
    dataPressao="["+dataPressao.replace(/[',]+/g, '","')+"]";
    //Luminosidade
    let dataLuminosidade= this.csv_sensor.luminosidade;
    dataLuminosidade='"'+dataLuminosidade.slice(0, -1)+'"';
    dataLuminosidade="["+dataLuminosidade.replace(/[',]+/g, '","')+"]";

    //TemperaturaSolo
    let dataTemperaturaSolo_=this.csv_sensor.temperatura_solo;
    dataTemperaturaSolo_='"'+dataTemperaturaSolo_.slice(0, -1)+'"';
    dataTemperaturaSolo_="["+dataTemperaturaSolo_.replace(/[',]+/g, '","')+"]";
    //UmidadeSolo
    let dataUmidadeSolo_=this.csv_sensor.umidade_solo;
    dataUmidadeSolo_='"'+dataUmidadeSolo_.slice(0, -1)+'"';
    dataUmidadeSolo_="["+dataUmidadeSolo_.replace(/[',]+/g, '","')+"]";
   //Condutividade
    let dataCondutividade_=this.csv_sensor.condutividade;
    dataCondutividade_='"'+dataCondutividade_.slice(0, -1)+'"';
    dataCondutividade_="["+dataCondutividade_.replace(/[',]+/g, '","')+"]";


    this.dataTemperatura_atm = {
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Temperatura (ºC)",
        data: JSON.parse(dataTemperaturaATM),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataUmidade_atm={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Umidade (%)",
        data: JSON.parse(dataUmidade),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataPressao={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Pressão (KPA)",
        data: JSON.parse(dataPressao),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataLuminosidade={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Luminosidade (Lux)",
        data: JSON.parse(dataLuminosidade),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataTemperaturaSolo={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Temperatura (ºC)",
        data: JSON.parse(dataTemperaturaSolo_),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataUmidadeSolo={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Umidade (%)",
        data: JSON.parse(dataUmidadeSolo_),
        backgroundColor: ["#f38b4a"],
      }]
    };

    this.dataCondutividade={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Condutividade (mSCm)",
        data: JSON.parse(dataCondutividade_),
        backgroundColor: ["#f38b4a"],
      }]
    };
  }
  async fetchCsvAtuador(): Promise<void> {
    this.csv_atuador = await this.relatorioService.getCsvAtuador();
    let dataLamina_=this.csv_atuador.lamina;
    dataLamina_='"'+dataLamina_.slice(0, -1)+'"';
    dataLamina_="["+dataLamina_.replace(/[',]+/g, '","')+"]";

    let labelDateTime=this.csv_atuador.datetime;
    labelDateTime='"'+labelDateTime.slice(0, -1)+'"';
    labelDateTime="["+labelDateTime.replace(/[',]+/g, '","')+"]";


    this.dataLaminaAtuador={
      labels: JSON.parse(labelDateTime),
      datasets: [{
        label: "Lamina (m3)",
        data: JSON.parse(dataLamina_),
        backgroundColor: ["#f38b4a"],
      }]
    };

  }

    goToPage(pageName:string):void{
      this.router.navigate([`${pageName}`]);
    }

     estadoIrrigacao(): string {
      if(this.atuador.estado_bomba==true){
        return "Ligada";
      }
      return "Desligada"

    }
    getLamina():number{
      var num = Number(this.atuador.lamina/60000); // The Number() only visualizes the type and is not needed
      var roundedString = num.toFixed(2);
      var rounded = Number(roundedString);
      return rounded;
    }







  //line chart
  type = 'line';
  typeC = 'bar';

  options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false
  };


}


