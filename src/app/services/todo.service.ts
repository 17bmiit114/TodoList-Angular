import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const headerOptions ={
  headers:  new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todoLimit: string = '?_limit=5'

  constructor(private http: HttpClient) { }

  //get todos
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todoLimit}`);
  }

  //on toggle 
  toggleCompleted(todo: Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url,todo, headerOptions)
  }

  //delete todo
  deleteTodo(todo: Todo):Observable<Todo>{
    //remove from ui
    const url = `${this.todosUrl}/${todo.id}`

    //remove from server
    return this.http.delete<Todo>(url, headerOptions)
  }

  //add todo
  addTodo(todo: Todo):Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo, headerOptions)
  }
}
