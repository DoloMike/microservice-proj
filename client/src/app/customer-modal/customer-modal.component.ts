import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from './../modal/modal.component';
import { CustomerService } from './../services/customer.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
	selector: 'app-customer-modal',
	templateUrl: './customer-modal.component.html',
	styleUrls: [ './customer-modal.component.scss' ]
})
export class CustomerModalComponent implements OnInit {
	@Input() customerId: string = '';
	canEdit: boolean = false;
	isNewSubmission: boolean = false;
	customer: any = {
		_id: '',
		first: '',
		last: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		date_of_birth: '',
		date_of_birthObj: '',
		ssn: '',
		email: ''
	};
	selectedState = '';
	states = [
		'AL',
		'AK',
		'AZ',
		'AR',
		'CA',
		'CO',
		'CT',
		'DE',
		'DC',
		'FL',
		'GA',
		'HI',
		'ID',
		'IL',
		'IN',
		'IA',
		'KS',
		'KY',
		'LA',
		'ME',
		'MD',
		'MA',
		'MI',
		'MN',
		'MS',
		'MO',
		'MT',
		'NE',
		'NV',
		'NH',
		'NJ',
		'NM',
		'NY',
		'NC',
		'ND',
		'OH',
		'OK',
		'OR',
		'PA',
		'RI',
		'SC',
		'SD',
		'TN',
		'TX',
		'UT',
		'VT',
		'VA',
		'WA',
		'WV',
		'WI',
		'WY'
	];
	filteredStates = [];

	constructor(
		private customerService: CustomerService,
		private spinnerService: Ng4LoadingSpinnerService,
		private modalService: NgbModal,
		private router: Router
	) {
		this.filteredStates = this.states;
	}

	ngOnInit() {
		this.isNewSubmission = this.customerId === 'new';

		if (!this.isNewSubmission) {
			this.spinnerService.show();
			this.customerService.getCustomer(this.customerId).subscribe(
				(data) => {
					this.customer = data;
					this.selectedState = this.customer.state;
					this.customer.date_of_birthObj = this.getDateObject(data.date_of_birth);
					this.spinnerService.hide();
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			this.canEdit = true;
		}
	}

	toggleEdit() {
		this.canEdit = !this.canEdit;
	}

	submit() {
		if (this.isNewSubmission) {
			this.customerService.postNewCustomer(this.customer).subscribe(
				(res) => {
					alert(`Customer Id ${res._id} Created!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/customers/` ]);
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			this.customer._id = this.customerId;
			this.customerService.updateCustomer(this.customer).subscribe(
				(res) => {
					alert(`Customer Id ${res._id} Updated!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/customers/` ]);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	delete() {
		if (confirm(`Click OK to Confirm Deletion of Customer: ${this.customerId}`)) {
			this.customerService.deleteCustomer(this.customerId).subscribe(
				(res) => {
					alert(`Customer Id ${res._id} Deleted!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/customers/` ]);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	getDate(dt) {
		return new Date(`${dt.year}/${dt.month}/${dt.day}`);
	}

	getDateObject(dt) {
		dt = new Date(dt);
		return { year: dt.getFullYear(), month: dt.getMonth(), day: dt.getDay() };
	}

	filterStates(e) {
		const filter = e.target.value.toUpperCase();
		this.filteredStates = this.states.filter((s) => s.includes(filter));
	}

	selectState(st) {
		this.selectedState = st;
	}
}
