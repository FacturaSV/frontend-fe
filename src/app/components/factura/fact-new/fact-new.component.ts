import { Component, OnInit } from '@angular/core';
import { SharedModule } from "../../../../shared.module";
import { Empresa, EmpresaService } from 'src/app/service/empresa.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from 'src/app/shared/icon/icon.module';

@Component({
  selector: 'app-fact-new',
  standalone: true,
  templateUrl: './fact-new.component.html',
  styleUrl: './fact-new.component.css',
  imports: [IconModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class FactNewComponent implements OnInit {
    empresa?: Empresa;

    items: any = [];
    selectedFile = null;
    params = {
        title: '',
        invoiceNo: '',
        to: {
            name: '',
            email: '',
            address: '',
            phone: '',
        },

        invoiceDate: '',
        dueDate: '',
        bankInfo: {
            no: '',
            name: '',
            swiftCode: '',
            country: '',
            ibanNo: '',
        },
        notes: '',
    };
    currencyList = [
        'USD - US Dollar',
        'GBP - British Pound',
        'IDR - Indonesian Rupiah',
        'INR - Indian Rupee',
        'BRL - Brazilian Real',
        'EUR - Germany (Euro)',
        'TRY - Turkish Lira',
    ];
    selectedCurrency = 'USD - US Dollar';
    tax:number | undefined;
    discount :number | undefined;
    shippingCharge:number | undefined;
    paymentMethod = '';

    constructor(private empresaService: EmpresaService) {
        this.cargarInfoEmpresa();
    }


    cargarInfoEmpresa() {
        this.empresaService.getEmpresaByGroup("token").subscribe((empresa: Empresa) => {
            this.empresa = empresa;
            console.log(empresa);
        });
    }

    ngOnInit() {
        //set default data
        this.items.push({
            id: 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        });
    }

    addItem() {
        let maxId = 0;
        if (this.items && this.items.length) {
            maxId = this.items.reduce((max: number, character: any) => (character.id > max ? character.id : max), this.items[0].id);
        }
        this.items.push({
            id: maxId + 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        });
    }

    removeItem(item: any = null) {
        this.items = this.items.filter((d: any) => d.id != item.id);
    }
}
