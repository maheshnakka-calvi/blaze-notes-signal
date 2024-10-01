import { computed, inject } from '@angular/core';
import { ToDosService } from '../../services/todos-service';
import { Todo } from './../models/todo-model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { lastValueFrom, of } from 'rxjs';

export type TodoFilter = 'all' | 'pending' | 'completed';
export type TodoError = {
  message: string;
  status: number | null;
  stackTrace: string | null | undefined;
};

type TodoState = {
  toDos: Todo[] | [];
  filter: TodoFilter;
  loading: boolean;
  error: TodoError | null;
};

const initialState: TodoState = {
  toDos: [],
  filter: 'all',
  loading: false,
  error: null,
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, toDoService: ToDosService = inject(ToDosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      try {
        const toDos = await lastValueFrom(toDoService.getToDos());
        patchState(store, { toDos, loading: false });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        patchState(store, {
          error: {
            message: errorMessage,
            status: null,
            stackTrace: null,
          },
          loading: false,
        });
      }
    },
    async addToDo(title: string) {
      const toDo: Todo = {
        id: store.toDos.length + 1,
        title,
        description: '',
        isCompleted: false,
        addedDate: new Date(),
        updatedDate: null,
      };
      await lastValueFrom(of([2]));
      patchState(store, { toDos: [...store.toDos(), toDo] });
    },
    async updateToDo(toDo: Todo) {
      const toDos = store
        .toDos()
        .map((todo) => (todo.id === toDo.id ? toDo : todo));
      patchState(store, { toDos });
    },

    async deleteToDoById(id: number) {
      const toDos = store.toDos().filter((todo) => todo.id !== id);
      patchState(store, { toDos });
    },

    async setFilter(filter: TodoFilter) {
      patchState(store, { filter });
    },
  })),

  withComputed((state) => ({
    filteredToDos: computed(() => {
      const filter = state.filter();
      const toDos = state.toDos();

      switch (filter) {
        case 'all':
          return toDos;
        case 'pending':
          return toDos.filter(
            (todo) => !todo.isCompleted || todo.isCompleted == null
          );
        case 'completed':
          return toDos.filter((todo) => todo.isCompleted);
      }
    }),
  }))
);
