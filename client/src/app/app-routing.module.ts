import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { LoanPageComponent } from './loan-page/loan-page.component';
import { LoanModalComponent } from './loan-modal/loan-modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{
		path: 'loans',
		component: LoanPageComponent,
		children: [
			{
				path: ':id',
				component: LoanModalComponent
			}
		],
		runGuardsAndResolvers: 'always'
	},
	{
		path: 'customers',
		component: CustomerPageComponent
	},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
