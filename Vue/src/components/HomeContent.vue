<script setup lang="ts">
import { ref } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxTreeList, {
  DxColumn,
  DxToolbar,
  DxItem,
} from 'devextreme-vue/tree-list';
import type DxTreeListComponent from 'devextreme-vue/ui/tree-list';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportTreeList } from '../assets/excelExporter';
import { employees } from '../assets/data';

const treeListRef = ref();

const exportToExcel = () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Employees');
  const treeList = treeListRef.value as DxTreeListComponent;

  if (treeList.instance !== undefined) {
    exportTreeList({
      component: treeList.instance,
      worksheet,
    })
      .then(() => {
        workbook.xlsx
          .writeBuffer()
          .then((buffer) => {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              'Employees.xlsx'
            );
          })
          .catch(() => {});
      })
      .catch(() => {});
  }
};

const expandedRowKeys = [1];

const exportButtonOptions = {
  icon: 'xlsxfile',
  onClick: exportToExcel,
};
</script>
<template>
  <div>
    <DxTreeList
      id="employees"
      ref="treeListRef"
      :data-source="employees"
      :root-value="-1"
      :expanded-row-keys="expandedRowKeys"
      :show-row-lines="true"
      :show-borders="true"
      :column-auto-width="true"
      key-expr="ID"
      parent-id-expr="Head_ID"
    >
      <DxColumn
        data-field="Title"
        caption="Position"
      />
      <DxColumn data-field="Full_Name"/>
      <DxColumn data-field="City"/>
      <DxColumn data-field="State"/>
      <DxColumn data-field="Mobile_Phone"/>
      <DxColumn
        data-field="Hire_Date"
        data-type="date"
      />

      <DxToolbar>
        <DxItem
          name="exportToXlsx"
          widget="dxButton"
          locate-in-menu="auto"
          :options="exportButtonOptions"
        />
      </DxToolbar>
    </DxTreeList>
  </div>
</template>
