import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { TodoFilter, TodosStore } from '../store/todos-store';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectionList, MatListOption, MatListModule } from '@angular/material/list';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { Todo } from '../models/todo-model';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    FormsModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule, 
    MatInputModule,
    MatButtonToggleModule,
    MatListModule,
    MatCheckboxModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
newToDo: string = '';
store = inject(TodosStore);

filter = viewChild.required(MatButtonToggleGroup);

constructor() {
  effect(() => {
    const filter = this.filter();
    filter.value = this.store.filter;
  });
}

addToDo(input: HTMLInputElement, newTodo: string) {
  this.store.addToDo(newTodo);
  input.value = '';
}

updateToDo(todo: Todo) {
  this.store.updateToDo(todo);
}

deleteToDo(todo: Todo) {
  this.store.deleteToDoById(todo.id);
}

onFilterChange(event: MatButtonToggleChange) {

  const filter = event.value as TodoFilter;
  this.store.setFilter(filter);
}

}
