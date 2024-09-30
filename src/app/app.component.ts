import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos-store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TodosListComponent } from "./todos-list/todos-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TodosListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'blaze-notes-signal';
  store = inject(TodosStore);

  ngOnInit(): void {
    this.loadToDos().then(() => console.log('ToDos loaded'));
  }

  async loadToDos(): Promise<void> {
    await this.store.loadAll();
  }
}
