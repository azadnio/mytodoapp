import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTasksOverview } from '../state/todo.selector';

declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  ngOnInit(): void {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    // google.charts.setOnLoadCallback(this.drawChart);

    google.charts.setOnLoadCallback(() =>
        this.store.select(getTasksOverview).subscribe((data) => this.drawChart({ 'Completed': data.completed, 'Pending': data.pending })
      )
    );

  }

  ngOnDestroy(): void {

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


