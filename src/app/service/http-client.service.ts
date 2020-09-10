import { Book } from './../model/Book';
import { User } from './../model/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  get: any;
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>('http://localhost:8087/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>(
      'http://localhost:8087/users/add',
      newUser
    );
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8087/users/' + id);
  }

  getBooks(){
   return  this.httpClient.get<Book[]>('http://localhost:8087/books/get');
  }

  addBook(newBook: Book){
    return this.httpClient.post<Book>('http://localhost:8087/books/add', newBook);
  }
}
