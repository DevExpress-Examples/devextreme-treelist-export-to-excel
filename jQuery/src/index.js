import { exportTreeList } from './excelExporter.js';

$(() => {
  const treeList = $('#employees')
    .dxTreeList({
      dataSource: employees,
      rootValue: -1,
      keyExpr: 'ID',
      parentIdExpr: 'Head_ID',
      columns: [
        {
          dataField: 'Title',
          caption: 'Position',
        },
        'Full_Name',
        'City',
        'State',
        'Mobile_Phone',
        {
          dataField: 'Hire_Date',
          dataType: 'date',
        },
      ],
      expandedRowKeys: [1],
      showRowLines: true,
      showBorders: true,
      columnAutoWidth: true,
      toolbar: {
        items: [
          {
            name: 'exportToXlsx',
            widget: 'dxButton',
            locateInMenu: 'auto',
            options: {
              icon: 'xlsxfile',
              onClick: exportToExcel,
            },
          },
        ],
      },
    })
    .dxTreeList('instance');

  function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportTreeList({
      component: treeList,
      worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employees.xlsx');
      });
    });
  }
});
