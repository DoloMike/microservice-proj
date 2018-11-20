import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { LoanPageComponent } from './loan-page/loan-page.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { LoanService } from './services/loan.service';
import { CustomerService } from './services/customer.service';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoanModalComponent } from './loan-modal/loan-modal.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
	declarations: [
		AppComponent,
		LoanPageComponent,
		CustomerPageComponent,
		NavHeaderComponent,
		PageNotFoundComponent,
		LoanModalComponent,
		HomePageComponent,
		ModalComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		NgbModule,
		DataTablesModule,
		Ng4LoadingSpinnerModule
	],
	providers: [ LoanService, CustomerService, NgbActiveModal ],
	bootstrap: [ AppComponent ],
	entryComponents: [ PageNotFoundComponent ]
})
export class AppModule {}
