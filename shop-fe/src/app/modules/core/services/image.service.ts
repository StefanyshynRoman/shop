import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = `${environment.apiUrl}/image`;
  constructor(private http: HttpClient) {}

  addImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, formData, {
      withCredentials: true,
    });
  }
}
