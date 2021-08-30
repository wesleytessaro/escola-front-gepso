import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import Sensor from 'src/app/shared/models/sensor-model';
import Atuador from 'src/app/shared/models/atuador-model';
import Csv_sensor from 'src/app/shared/models/csv-sensor-model';
import Csv_atuador from 'src/app/shared/models/csv-atuador-model';
import { RelatorioService } from 'src/app/relatorio/relatorio.service';
import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  csv_sensor=new Csv_sensor();
  csv_atuador=new Csv_atuador();
  dataTemperatura_atm;
  dataUmidade_atm;
  dataPressao;
  dataLuminosidade;
  dataTemperaturaSolo;
  dataCondutividade;
  dataUmidadeSolo;
  dataLaminaAtuador;
  labelDateTime;
  readyDataDownload=false;



  //line chart
   type = 'line';
   type2 = 'bar';
   data = {
     labels: ["January", "February", "March", "April", "May", "June", "July"],
     datasets: [{
       label: "My First dataset",
       data: [65, 59, 45, 81, 56, 55, 40],
       backgroundColor: ["#f38b4a"],
     },{
         label: "My Second dataset",
         data: [80, 59, 75, 81, 85, 55, 40],
         backgroundColor: ["#6970d5"],
       }]
   };
   data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      data: [300, 150, 45, 81, 56, 55, 40],
      backgroundColor: ["#f38b4a"],
    },{
        label: "My Second dataset",
        data: [80, 59, 75, 81, 85, 55, 40],
        backgroundColor: ["#6970d5"],
      }]
  };
   options = {
     responsive: true,
     maintainAspectRatio: false
   };


 // constructor(){}
  ngOnInit(): void {



  }
  constructor(private router: Router, calendar: NgbCalendar,private http:HttpClient,private relatorioService: RelatorioService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);



  }
  back(): void {
    this.router.navigateByUrl('/');
  }

  async fetchCsvSensor(date_from:string,date_to:string): Promise<void> {
    this.csv_sensor = await this.relatorioService.getCsvSensorD(date_from,date_to);


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
  async fetchCsvAtuador(date_from:string,date_to:string): Promise<void> {
    this.csv_atuador = await this.relatorioService.getCsvAtuadorD(date_from,date_to);
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
    this.readyDataDownload=true;
  }

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  returnDataFinal() {
    if(this.toDate!=null){
      return this.toDate.day + "/" + this.toDate.month + "/" + this.toDate.year;
    }
    return "";
  }
  request(){
    if(this.toDate!=null&&this.fromDate!=null){
      let fromDateString:string;
      let toDateString:string;
      if(`${this.fromDate.month}`.length==1){
        fromDateString=`${this.fromDate.year}0${this.fromDate.month}`;
      }
      else{
        fromDateString=`${this.fromDate.year}${this.fromDate.month}`;
      }

      if(`${this.fromDate.day}`.length==1){
        fromDateString=`${fromDateString}0${this.fromDate.day}`;
      }
      else{
        fromDateString=`${fromDateString}${this.fromDate.day}`;
      }

      if(`${this.toDate.month}`.length==1){
        toDateString=`${this.toDate.year}0${this.toDate.month}`;
      }
      else{
        toDateString=`${this.toDate.year}${this.toDate.month}`;
      }

      if(`${this.toDate.day}`.length==1){
        toDateString=`${toDateString}0${this.toDate.day}`;
      }
      else{
        toDateString=`${toDateString}${this.toDate.day}`;
      }

      this.fetchCsvSensor(fromDateString,toDateString);
      this.fetchCsvAtuador(fromDateString,toDateString);
      console.log("fromDateString:"+fromDateString);
      console.log("toDateString:"+toDateString);

      let res = "Text to save in a text file";


    }

    return "Requisição...";
  }

  requestDownload(){
    if (this.readyDataDownload==true){
    let download:string;

    download=JSON.stringify(this.csv_sensor);
    //download=this.csv_sensor.datetime + "," + this.csv_sensor.temperatura_atm + ","+ this.csv_sensor.umidade_atm+","+ this.csv_sensor.pressao_atm+","+ this.csv_sensor.luminosidade+","+ this.csv_sensor.temperatura_solo+","+ this.csv_sensor.umidade_solo+","+ this.csv_sensor.condutividade+","+ this.csv_sensor.luminosidade;
    const blob = new Blob([download], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
    this.readyDataDownload=false;
  }
  }



}
