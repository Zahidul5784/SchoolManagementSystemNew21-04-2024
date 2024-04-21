import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Standard } from '../Models/standard';


@Injectable({
  providedIn: 'root',
})
export class StandardService {

  private apiUrl = 'https://localhost:7225/api/Standards';

  constructor(private http: HttpClient) { }


  getStandards(): Observable<Standard[]> {
    return this.http.get<Standard[]>(this.apiUrl);
  }

  // Retrieve a specific fee type by ID
  getStandardById(id: number): Observable<Standard> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Standard>(url);
  }

  // Create a new fee type
  createStandard(Standard: Standard): Observable<Standard> {
    return this.http.post<Standard>(this.apiUrl, Standard);
  }




  // Update an existing fee type
  updateStandard(Standard: Standard): Observable<Standard> {
    const url = `${this.apiUrl}/${Standard.standardId}`;
    return this.http.put<Standard>(url, Standard);
  }

  // Delete a fee type
  deleteStandard(id: number): Observable<Standard> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Standard>(url);
  }
}

