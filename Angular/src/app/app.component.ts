import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import type { DxTreeListComponent } from 'devextreme-angular/ui/tree-list';
import { Workbook } from 'devextreme-exceljs-fork';
import { saveAs } from 'file-saver';
import type { Employee } from './app.service';
import { Service } from './app.service';
import { exportTreeList } from './excelExporter';
import { DxTreeListModule } from 'devextreme-angular/ui/tree-list';

@Component({
  imports: [DxTreeListModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
