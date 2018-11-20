import { Component } from '@angular/core';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'client';
}
