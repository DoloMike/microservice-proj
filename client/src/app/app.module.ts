import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoanPageComponent } from './loan-page/loan-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { LoanService } from './services/loan.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoanModalComponent } from './loan-modal/loan-modal.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
	declarations: [
		AppComponent,
		LoanPageComponent,
		CustomerPageComponent,
		NavHeaderComponent,
		PageNotFoundComponent,
		LoanModalComponent,
		HomePageComponent
	],
	imports: [ BrowserModule, HttpClientModule, AppRoutingModule, NgbModule, DataTablesModule, Ng4LoadingSpinnerModule ],
	providers: [ LoanService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
