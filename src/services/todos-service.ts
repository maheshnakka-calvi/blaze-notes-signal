import { Injectable } from '@angular/core';
import { Todo } from '../app/models/todo-model';
import { HttpClient } from '@angular/common/http';
import { serviceTodo, serviceResponse } from './external-todo';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToDosService {
    constructor(private http: HttpClient) {}
    getToDos(): Observable<Todo[]> {
        return this.http.get<serviceResponse>('https://dummyjson.com/todos?limit=5').pipe(
            map((response) => response.todos.map((todo) => ({ id: todo.id, title: todo.todo, description: '', isCompleted: todo.completed, addedDate: new Date(), updatedDate: null })))
        );
    }
}