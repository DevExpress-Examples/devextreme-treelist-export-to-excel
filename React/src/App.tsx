import React, { useRef, useCallback, useMemo } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import TreeList, { Column, Toolbar, Item } from 'devextreme-react/tree-list';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportTreeList } from './excelExporter';
import { employees } from './data';

const expandedRowKeys = [1];

function App(): JSX.Element {
  const treeList = useRef<TreeList>(null);

  const exportToExcel = useCallback(() => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Employees');

    exportTreeList({
      component: treeList.current?.instance,
      worksheet,
    })
      .then(() => {
        workbook.xlsx
          .writeBuffer()
          .then((buffer) => {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              'Employees.xlsx',
            );
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const exportButtonOptions = useMemo(
    () => ({
      icon: 'xlsxfile',
      onClick: exportToExcel,
    }),
    [],
  );

  return (
    <TreeList
      ref={treeList}
      id='employees'
      dataSource={employees}
      rootValue={-1}
      keyExpr='ID'
      parentIdExpr='Head_ID'
      defaultExpandedRowKeys={expandedRowKeys}
      showRowLines={true}
      showBorders={true}
      columnAutoWidth={true}
    >
      <Column dataField='Title' caption='Position' />
      <Column dataField='Full_Name' />
      <Column dataField='City' />
      <Column dataField='State' />
      <Column dataField='Mobile_Phone' />
      <Column dataField='Hire_Date' dataType='date' />

      <Toolbar>
        <Item
          name='exportToXlsx'
          widget='dxButton'
          locateInMenu='auto'
          options={exportButtonOptions}
        />
      </Toolbar>
    </TreeList>
  );
}

export default App;
