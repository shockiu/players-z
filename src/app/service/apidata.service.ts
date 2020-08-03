import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interface/user.data';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  urlApi = 'api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.urlApi);
  }

  updateUser(user: Users): Observable<Users[]> {
    return this.http.put<Users[]>(this.urlApi, user);
  }

  deleteUser(id: number): Observable<Users[]> {
    return this.http.delete<Users[]>(this.urlApi+'/'+id);
  }

  addUser(user: Users, numberOfUsers: number): Observable<Users[]> {
    if (numberOfUsers === 0){
      user.id = 1;
      return this.http.put<Users[]>(this.urlApi, user);
    } else {
      return this.http.post<Users[]>(this.urlApi, user);
    }
    
  }

}
