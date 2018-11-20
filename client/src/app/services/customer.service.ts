import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {
	apiUrl = environment.customersApiEndpoint;

	constructor(private http: HttpClient) {}

	getAllCustomers(): Observable<any> {
		return this.http.get(`${this.apiUrl}`);
	}

	getCustomer(id: string): Observable<any> {
		return this.http.get(`${this.apiUrl}${id}`);
	}
}
