import TreeList, { Column, DataStructure } from 'devextreme/ui/tree_list';
import { Worksheet } from 'exceljs';
import { Employee } from './data';

const MIN_COLUMN_WIDTH = 10;
const PIXELS_PER_INDENT = 10;
const PIXELS_PER_EXCEL_WIDTH_UNIT = 8;
const CELL_PADDING = 2;

interface EmployeeWithItems extends Employee {
  items: Employee[];
  depth: number;
}

class TreeListHelpers {
  private readonly component: TreeList;

  private readonly worksheet: Worksheet;

  private readonly columns: Column[];

  private readonly dateColumns: Column[];

  private readonly lookupColumns: Column[];

  private readonly rootValue: any;

  private readonly parentIdExpr: string;

  private readonly keyExpr: string;

  private readonly dataStructure: DataStructure;

  constructor(component: TreeList, worksheet: Worksheet) {
    this.component = component;
    this.worksheet = worksheet;
    this.columns = this.component.getVisibleColumns();
    this.dateColumns = this.columns.filter(
      (column) => column.dataType === 'date' || column.dataType === 'datetime',
    );
    this.lookupColumns = this.columns.filter(
      (column) => column.lookup !== undefined,
    );

    this.rootValue = this.component.option('rootValue');
    this.parentIdExpr = this.component.option('parentIdExpr') as string;
    this.keyExpr = (this.component.option('keyExpr')
      ?? this.component.getDataSource().key()) as string;
    this.dataStructure = this.component.option(
      'dataStructure',
    ) as DataStructure;

    const properties: any = this.worksheet.properties;
    properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };
  }

  public getData(): Promise<Employee[]> {
    return this.component
      .getDataSource()
      .store()
      .load()
      .then((result: Employee[]) => this.processData(result));
  }

  private processData(data: Employee[]): Employee[] {
    let rows = data;
    if (this.dataStructure === 'plain') rows = this.convertToHierarchical(rows);
    return this.depthDecorator(rows);
  }

  private depthDecorator(
    data: Employee[] | EmployeeWithItems[],
    depth = 0,
  ): EmployeeWithItems[] {
    const result: EmployeeWithItems[] = [];

    data.forEach((node: any) => {
      result.push({
        ...node,
        depth,
        items: this.depthDecorator(node.items ?? [], depth + 1),
      });
    });

    return result;
  }

  private convertToHierarchical(
    data: Employee[],
    id: any = this.rootValue,
  ): EmployeeWithItems[] {
    const result: EmployeeWithItems[] = [];
    const roots: EmployeeWithItems[] = [];

    data.forEach((node: any) => {
      if (node[this.parentIdExpr] === id) roots.push(node);
    });

    roots.forEach((node: any) => {
      result.push({
        ...node,
        items: this.convertToHierarchical(data, node[this.keyExpr]),
      });
    });

    return result;
  }

  private exportRows(rows: EmployeeWithItems[]): void {
    rows.forEach((row: any) => {
      this.exportRow(row);

      if (this.hasChildren(row)) this.exportRows(row.items);
    });
  }

  private exportRow(row: EmployeeWithItems): void {
    this.formatDates(row);
    this.assignLookupText(row);

    const insertedRow: any = this.worksheet.addRow(row);
    insertedRow.outlineLevel = row.depth;
    this.worksheet.getCell(`A${insertedRow.number}`).alignment = {
      indent: row.depth * 2,
    };
  }

  private formatDates(row: any): void {
    this.dateColumns.forEach((column: any) => {
      row[column.dataField] = new Date(row[column.dataField]);
    });
  }

  private assignLookupText(row: any): void {
    this.lookupColumns.forEach((column: any) => {
      row[column.dataField] = column.lookup.calculateCellValue(
        row[column.dataField],
      );
    });
  }

  private generateColumns(): void {
    this.worksheet.columns = this.columns.map(
      ({ caption, dataField }: Column) => ({
        header: caption,
        key: dataField,
      }),
    );
  }

  private hasChildren(row: EmployeeWithItems): boolean {
    return row.items && row.items.length > 0;
  }

  private autoFitColumnsWidth(): void {
    this.worksheet.columns.forEach((column: any) => {
      let maxLength: number = MIN_COLUMN_WIDTH;
      if (column.number === 1) {
        // first column
        column.eachCell((cell: any) => {
          const indent: number = cell.alignment
            ? cell.alignment.indent
              * (PIXELS_PER_INDENT / PIXELS_PER_EXCEL_WIDTH_UNIT)
            : 0;
          const valueLength: number = cell.value.toString().length;

          if (indent + valueLength > maxLength) {
            maxLength = indent + valueLength;
          }
        });
      } else {
        column.values.forEach((v: any) => {
          // date column
          if (
            this.dateColumns.some(
              (dateColumn: any) => dateColumn.dataField === column.key,
            )
            && typeof v !== 'string'
            && v.toLocaleDateString().length > maxLength
          ) {
            maxLength = v.toLocaleDateString().length;
          }

          // other columns
          if (
            !this.dateColumns.some(
              (dateColumn: any) => dateColumn.dataField === column.key,
            )
            && v.toString().length > maxLength
          ) {
            maxLength = v.toString().length;
          }
        });
      }
      column.width = maxLength + CELL_PADDING;
    });
  }

  public export(): Promise<void> {
    this.component.beginCustomLoading('Exporting to Excel...');

    return this.getData().then((rows: any) => {
      this.generateColumns();
      this.exportRows(rows);
      this.autoFitColumnsWidth();
      this.component.endCustomLoading();
    });
  }
}

function exportTreeList({ component, worksheet }: any): Promise<void> {
  const helpers = new TreeListHelpers(component, worksheet);
  return helpers.export();
}

export { exportTreeList };
