import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly headers = { headers: new HttpHeaders({ 'authorId': '1' }) };

  public get<T>(endpoint: string) {
    return this.http.get<T>(endpoint, this.headers);
  }

  public post<T, F>(endpoint: string, body: F) {
    return this.http.post<T>(endpoint, body, this.headers);
  }

  public put<T, F>(endpoint: string, body: F) {
    return this.http.put<T>(endpoint, body, this.headers);
  }

  public delete<T>(endpoint: string) {
    return this.http.delete<T>(endpoint, this.headers);
  }

  constructor(private http: HttpClient) { }
}
