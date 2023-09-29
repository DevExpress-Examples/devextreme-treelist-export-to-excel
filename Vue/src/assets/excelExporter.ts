import type TreeList from "devextreme/ui/tree_list";
import type { Column, DataStructure } from "devextreme/ui/tree_list";
import type {
  Cell,
  CellValue,
  Column as ExcelColumn,
  Row,
  Worksheet,
} from "exceljs";
import type { Employee, EmployeeWithItems } from "./data";

const MIN_COLUMN_WIDTH = 10;
const PIXELS_PER_INDENT = 10;
const PIXELS_PER_EXCEL_WIDTH_UNIT = 8;
const CELL_PADDING = 2;

interface TreeListExcelProps {
  component: TreeList;
  worksheet: Worksheet;
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
      (column) => column.dataType === "date" || column.dataType === "datetime"
    );
    this.lookupColumns = this.columns.filter(
      (column) => column.lookup !== undefined
    );

    this.rootValue = this.component.option("rootValue");
    this.parentIdExpr = this.component.option("parentIdExpr") as string;
    this.keyExpr = (this.component.option("keyExpr") ??
      this.component.getDataSource().key()) as string;
    this.dataStructure = this.component.option(
      "dataStructure"
    ) as DataStructure;

    // bug: check ExcelJS's GitHub issues #1352 & #2218
    const properties: any = this.worksheet.properties;
    properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };
  }

  public getData(): Promise<EmployeeWithItems[]> {
    return this.component
      .getDataSource()
      .store()
      .load()
      .then((result: Employee[]) => this.processData(result));
  }

  private processData(data: Employee[]): EmployeeWithItems[] {
    let rows = data;
    if (this.dataStructure === "plain") rows = this.convertToHierarchical(rows);
    return this.depthDecorator(rows);
  }

  private depthDecorator(
    data: Employee[] | EmployeeWithItems[],
    depth = 0
  ): EmployeeWithItems[] {
    const result: EmployeeWithItems[] = [];

    data.forEach((node: Employee | EmployeeWithItems) => {
      result.push({
        ...node,
        depth,
        items: this.depthDecorator(
          "items" in node ? node.items : [],
          depth + 1
        ),
      });
    });

    return result;
  }

  private convertToHierarchical(
    data: Employee[] | EmployeeWithItems[],
    id = this.rootValue
  ): EmployeeWithItems[] {
    const result: EmployeeWithItems[] = [];
    const roots: (Employee | EmployeeWithItems)[] = [];

    data.forEach((node) => {
      if (node[this.parentIdExpr] === id) roots.push(node);
    });

    roots.forEach((node) => {
      result.push({
        ...node,
        items: this.convertToHierarchical(data, node[this.keyExpr]),
        depth: 0,
      });
    });

    return result;
  }

  private exportRows(rows: EmployeeWithItems[]): void {
    rows.forEach((row: EmployeeWithItems) => {
      this.exportRow(row);

      if (this.hasChildren(row)) {
        this.exportRows(row.items as EmployeeWithItems[]);
      }
    });
  }

  private exportRow(row: EmployeeWithItems): void {
    this.formatDates(row);
    this.assignLookupText(row);

    const insertedRow: Row = this.worksheet.addRow(row);
    insertedRow.outlineLevel = row.depth;
    this.worksheet.getCell(`A${insertedRow.number}`).alignment = {
      indent: row.depth * 2,
    };
  }

  private formatDates(row: EmployeeWithItems): void {
    this.dateColumns.forEach((column) => {
      if (column.dataField !== undefined) {
        row[column.dataField] = new Date(row[column.dataField]);
      }
    });
  }

  private assignLookupText(row: EmployeeWithItems): void {
    this.lookupColumns.forEach((column) => {
      if (column.dataField && column.lookup?.calculateCellValue) {
        row[column.dataField] = column.lookup.calculateCellValue(
          row[column.dataField]
        );
      }
    });
  }

  private generateColumns(): void {
    this.worksheet.columns = this.columns.map(
      ({ caption, dataField }: Column) => ({
        header: caption,
        key: dataField,
      })
    );
  }

  private hasChildren(row: EmployeeWithItems): boolean {
    return row.items && row.items.length > 0;
  }

  private autoFitColumnsWidth(): void {
    this.worksheet.columns.forEach((column: Partial<ExcelColumn>) => {
      let maxLength: number = MIN_COLUMN_WIDTH;

      // first column
      if (column.number === 1 && column.eachCell !== undefined) {
        column.eachCell((cell: Cell) => {
          const indent: number = cell.alignment?.indent
            ? cell.alignment.indent *
              (PIXELS_PER_INDENT / PIXELS_PER_EXCEL_WIDTH_UNIT)
            : 0;

          let valueLength = this.getValueLength(cell.value);

          if (indent + valueLength > maxLength) {
            maxLength = indent + valueLength;
          }
        });
      }

      // other columns
      if (column.number !== 1) {
        column.values?.forEach((value: CellValue) => {
          if (value === null || value === undefined) return;
          let valueLength = this.getValueLength(value);

          if (valueLength > maxLength) maxLength = valueLength;
        });
      }

      column.width = maxLength + CELL_PADDING;
    });
  }

  private getValueLength(value: CellValue): number {
    let length = 0;

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      length = value.toString().length;
    }

    if (value instanceof Date) {
      length = value.toLocaleDateString().length;
    }

    return length;
  }

  public export(): Promise<void> {
    this.component.beginCustomLoading("Exporting to Excel...");

    return this.getData().then((rows: any) => {
      this.generateColumns();
      this.exportRows(rows);
      this.autoFitColumnsWidth();
      this.component.endCustomLoading();
    });
  }
}

function exportTreeList({
  component,
  worksheet,
}: TreeListExcelProps): Promise<void> {
  const helpers = new TreeListHelpers(component, worksheet);
  return helpers.export();
}

export { exportTreeList };
