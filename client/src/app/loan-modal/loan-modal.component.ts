import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from './../modal/modal.component';
import { LoanService } from './../services/loan.service';
import { CustomerService } from './../services/customer.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
	selector: 'app-loan-modal',
	templateUrl: './loan-modal.component.html',
	styleUrls: [ './loan-modal.component.scss' ]
})
export class LoanModalComponent implements OnInit {
	@Input() loanId: string = '';
	customers: Array<any> = [];
	filteredCustomers: Array<any> = [];
	selectedCustomerName: string = 'Select Borrower';
	selectedCustomerObject: any = {};
	canEdit: boolean = false;
	isNewSubmission: boolean = false;
	loan: any = {
		_id: '',
		customerId: '',
		amount: '',
		balance: '',
		term: '',
		purpose: '',
		rate: '',
		maturityDate: '',
		orginationDate: '',
		maturityDateObj: '',
		orginationDateOBJ: ''
	};

	constructor(
		private loanService: LoanService,
		private customerService: CustomerService,
		private spinnerService: Ng4LoadingSpinnerService,
		private modalService: NgbModal,
		private router: Router
	) {}

	ngOnInit() {
		this.spinnerService.show();
		this.isNewSubmission = this.loanId === 'new';
		if (!this.isNewSubmission) {
			this.loanService.getLoan(this.loanId).subscribe(
				(data) => {
					this.loan = data;
					this.loan.maturityDateObj = this.getDateObject(data.maturityDate);
					this.loan.orginationDateObj = this.getDateObject(data.orginationDate);
					this.customerService.getCustomer(this.loan.customerId).subscribe((res) => {
						this.selectedCustomerObject = res;
						this.selectedCustomerName = `${res.first} ${res.last}`;
					});
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			this.canEdit = true;
		}
		this.customerService.getAllCustomers().subscribe(
			(data) => {
				this.customers = data;
				this.filteredCustomers = this.customers.slice(0, 10);
				this.spinnerService.hide();
			},
			(err) => {
				console.log(err);
			}
		);
	}

	toggleEdit() {
		this.canEdit = !this.canEdit;
	}

	submit() {
		this.loan.customerId = this.selectedCustomerObject._id;
		this.loan.orginationDate = this.getDate(this.loan.orginationDateObj);
		this.loan.maturityDate = this.getDate(this.loan.maturityDateObj);

		if (this.isNewSubmission) {
			this.loanService.postNewLoan(this.loan).subscribe(
				(res) => {
					alert(`Loan Id ${res._id} Created!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/loans/` ]);
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			this.loan._id = this.loanId;
			this.loanService.updateLoan(this.loan).subscribe(
				(res) => {
					alert(`Loan Id ${res._id} Updated!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/loans/` ]);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	delete() {
		if (confirm(`Click OK to Confirm Deletion of Loan: ${this.loanId}`)) {
			this.loanService.deleteLoan(this.loanId).subscribe(
				(res) => {
					alert(`Loan Id ${res._id} Deleted!`);
					this.modalService.dismissAll();
					this.router.navigate([ `/loans/` ]);
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

	selectCustomer(id) {
		this.selectedCustomerObject = this.filteredCustomers.filter((fc) => fc._id === id)[0];
		this.selectedCustomerName = `${this.selectedCustomerObject.first} ${this.selectedCustomerObject.last}`;
	}

	filterCustomers(e: any) {
		const filter = e.target.value;
		this.filteredCustomers = this.customers.filter((c) => c.first.includes(filter) || c.last.includes(filter));
	}
}
