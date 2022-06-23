import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isCreatingTask = false;
  isDeletingTask = false;

  task = {
    title: '',
    description: '',
    time: new Date(),
    id: 56
  }

  tasks = [{ title: 'the title guiasdv iuasdhv uiadgsvhiausdv adishg sfiubisdufhgiu sdiufguisdhfiguhsdif guisdfguis dfuigsdfgghui  ', description: 'the description', time: new Date(), isActive: false, id:2 },
  { title: 'the title ', description: 'the description', time: new Date(), isActive: false, id:3 },
  { title: 'the title ', description: 'the description', time: new Date(), isActive: true, id:4 },
  { title: 'the title ', description: 'the description', time: new Date(), isActive: false, id:5 },
  { title: 'the title ', description: 'the description', time: new Date(), isActive: false, id:6 }]

  createTask() {

    console.log('creating task')
  }

  deleteTask(id: any) {
    console.log('deleting task')
  }

  markAsDone(task: any) {

    console.log('done', task)
  }

}
