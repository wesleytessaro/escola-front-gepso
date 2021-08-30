import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-chartjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
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
  constructor(private router: Router, calendar: NgbCalendar,private http:HttpClient) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }
  back(): void {
    this.router.navigateByUrl('/');
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

    return "Requisição...";
  }



}
