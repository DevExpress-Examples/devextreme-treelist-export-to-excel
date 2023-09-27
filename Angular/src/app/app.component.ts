import { Component, ViewChild } from '@angular/core';
import { DxTreeListComponent } from 'devextreme-angular';
import { Employee, Service } from './app.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

import { exportTreeList } from './excelExporter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('treeList', { static: false }) treeList!: DxTreeListComponent;

  employees: Employee[];

  expandedRowKeys: number[];

  exportButtonOptions: any;

  constructor(service: Service) {
    this.employees = service.getEmployees();
    this.expandedRowKeys = [1];
    this.exportButtonOptions = {
      icon: 'xlsxfile',
      onClick: this.exportToExcel.bind(this),
    };
  }

  exportToExcel(): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportTreeList({
      component: this.treeList.instance,
      worksheet,
    })
      .then(() => {
        workbook.xlsx
          .writeBuffer()
          .then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employees.xlsx');
          })
          .catch(() => {});
      })
      .catch(() => {});
  }
}
