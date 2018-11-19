import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoanService {
	apiUrl = environment.loansApiEndpoint;

	constructor(private http: HttpClient) {}

	getAllLoans(): Observable<any> {
		return this.http.get(`${this.apiUrl}`);
	}

	getLoan(id: string): Observable<any> {
		return this.http.get(`${this.apiUrl}${id}`);
	}
}
