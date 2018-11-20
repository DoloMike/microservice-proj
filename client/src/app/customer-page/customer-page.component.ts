import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationEnd } from '@angular/router';
import { ModalComponent } from './../modal/modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from './../services/customer.service';
import { CustomerModalComponent } from './../customer-modal/customer-modal.component';

@Component({
	selector: 'app-customer-page',
	templateUrl: './customer-page.component.html',
	styleUrls: [ './customer-page.component.scss' ]
})
export class CustomerPageComponent implements OnInit {
	message = '';
	dtOptions: DataTables.Settings = {};
	columns: Array<Object> = [];
	navigationSubscription;
	loaded: boolean = false;

	constructor(
		private customerService: CustomerService,
		private spinnerService: Ng4LoadingSpinnerService,
		private router: Router,
		private modalService: NgbModal
	) {
		router.events.subscribe((val) => {
			if (val instanceof NavigationEnd && val.url.split('/').length > 2) {
				const id = val.url.split('/')[2];
				this.openModal(id);
			} else if (val instanceof NavigationEnd && val.url.split('/').length === 2) {
				this.loaded = false;
				this.ngOnInit();
			}
		});
	}

	openModal(id) {
		if (!this.modalService.hasOpenModals()) {
			const modalRef = this.modalService.open(CustomerModalComponent, { centered: true });
			modalRef.componentInstance.customerId = id;
		}
	}

	buildDtOptions(customerData): void {
		Object.keys(customerData[0]).map((k) => {
			this.columns.push({ title: k, data: k });
		});

		this.dtOptions = {
			data: customerData,
			columns: this.columns,
			pagingType: 'full_numbers',
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				$('td', row).unbind('click');
				$('td', row).bind('click', () => {
					self.rowClickHandler(data);
				});
				return row;
			}
		};
	}

	ngOnInit() {
		this.spinnerService.show();
		this.dtOptions = {};
		this.columns = [];
		this.customerService.getAllCustomers().subscribe(
			(data) => {
				this.buildDtOptions(data);
				this.spinnerService.hide();
				this.loaded = true;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	addNew() {
		this.router.navigate([ `/customers/new` ]);
	}

	rowClickHandler(customer: any): void {
		this.router.navigate([ `/customers/${customer._id}` ]);
		this.openModal(customer._id);
	}
}
