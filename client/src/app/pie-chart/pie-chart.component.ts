import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(this.drawChart);

    setTimeout(() => {
      this.drawChart({
        'Completed': 0.78,
        'Pending': 0.21
      });
     }, 5000);
  }

  drawChart(chartData: any = { 'Completed': 0, 'Pending': 0 }) {

    var options = {
      'title':'Tasks overview',
      'width':'90%'
    };

    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');

    //extract the pie chart data from suplied parameter
    let dataRows = []
    for (const key in chartData) {
      if (Object.prototype.hasOwnProperty.call(chartData, key))
        dataRows.push([key, chartData[key]]);
    }

    data.addRows(dataRows);

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, options);

  }



}


