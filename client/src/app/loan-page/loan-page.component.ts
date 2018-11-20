import { Component, OnInit } from '@angular/core';
import { LoanService } from './../services/loan.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, NavigationEnd } from '@angular/router';
import { LoanModalComponent } from './../loan-modal/loan-modal.component';
import { ModalComponent } from './../modal/modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-loan-page',
	templateUrl: './loan-page.component.html',
	styleUrls: [ './loan-page.component.scss' ]
})
export class LoanPageComponent implements OnInit {
	message = '';
	dtOptions: DataTables.Settings = {};
	columns: Array<Object> = [];
	navigationSubscription;
	loaded: boolean = false;

	constructor(
		private loanService: LoanService,
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
			const modalRef = this.modalService.open(LoanModalComponent, { centered: true });
			modalRef.componentInstance.loanId = id;
		}
	}

	buildDtOptions(loanData): void {
		Object.keys(loanData[0]).map((k) => {
			this.columns.push({ title: k, data: k });
		});

		this.dtOptions = {
			data: loanData,
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
		this.loanService.getAllLoans().subscribe(
			(loanData) => {
				this.buildDtOptions(loanData);
				this.spinnerService.hide();
				this.loaded = true;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	addNew() {
		this.router.navigate([ `/loans/new` ]);
	}

	rowClickHandler(loan: any): void {
		this.router.navigate([ `/loans/${loan._id}` ]);
		this.openModal(loan._id);
	}
}
