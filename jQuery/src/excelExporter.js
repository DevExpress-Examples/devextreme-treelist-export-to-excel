const MINCOLUMNWIDTH = 10;
const PIXELSPERINDENT = 10;
const PIXELSPEREXCELWIDTHUNIT = 8;

class TreeListHelpers {
  constructor(component, worksheet, options) {
    this.component = component;
    this.worksheet = worksheet;
    this.columns = this.component.getVisibleColumns();

    this.rootValue = this.component.option('rootValue');
    this.parentIdExpr = this.component.option('parentIdExpr');
    this.keyExpr = this.component.option('keyExpr') || this.component.getDataSource().key();
    this.dataStructure = this.component.option('dataStructure');

    this.worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };
  }

  getData() {
    return this.component
      .getDataSource()
      .store()
      .load()
      .then((result) => this.processData(result));
  }

  processData(data) {
    let rows = data;
    if (this.dataStructure === 'plain') rows = this.convertToHierarchical(rows);
    return this.depthDecorator(rows);
  }

  // adds the depth for hierarchical data
  depthDecorator(data, depth = 0) {
    const result = [];

    data.forEach((node) => {
      result.push({
        ...node,
        depth,
        items: this.depthDecorator(node.items || [], depth + 1),
      });
    });

    return result;
  }

  // converts plain to hierarchical
  convertToHierarchical(data, id = this.rootValue) {
    const result = [];
    const roots = [];

    data.forEach((node) => {
      if (node[this.parentIdExpr] === id) roots.push(node);
    });

    roots.forEach((node) => {
      result.push({
        ...node,
        items: this.convertToHierarchical(data, node[this.keyExpr]),
      });
    });

    return result;
  }

  exportRows(rows) {
    rows.forEach((row) => {
      this.exportRow(row);

      if (this.hasChildren(row)) this.exportRows(row.items);
    });
  }

  exportRow(row) {
    const insertedRow = this.worksheet.addRow(row);
    insertedRow.outlineLevel = row.depth;
    this.worksheet.getCell(`A${insertedRow.number}`).alignment = {
      indent: row.depth * 2,
    };
  }

  generateColumns() {
    this.worksheet.columns = this.columns.map(({ caption, dataField }) => ({
      header: caption,
      key: dataField,
    }));
  }

  hasChildren(row) {
    return row.items && row.items.length > 0;
  }

  autoFitColumnsWidth() {
    this.worksheet.columns.forEach((column) => {
      let maxLength = MINCOLUMNWIDTH;
      if (column.number === 1) {
        // first column
        column.eachCell((cell) => {
          const indent = cell.alignment
            ? cell.alignment.indent * (PIXELSPERINDENT / PIXELSPEREXCELWIDTHUNIT)
            : 0;
          const valueLength = cell.value.toString().length;

          if (indent + valueLength > maxLength) maxLength = indent + valueLength;
        });
      } else {
        column.values.forEach((v) => {
          if (v.toString().length > maxLength) maxLength = v.toString().length;
        });
      }
      column.width = maxLength;
    });
  }

  export() {
    this.component.beginCustomLoading('Exporting to Excel...');

    return this.getData().then((rows) => {
      this.generateColumns();
      this.exportRows(rows);
      this.autoFitColumnsWidth();
      this.component.endCustomLoading();
    });
  }
}

function exportTreeList({ component, worksheet }) {
  const helpers = new TreeListHelpers(component, worksheet);
  return new Promise((resolve, reject) => {
    helpers.export().then(() => {
      resolve();
    });
  });
}

export { exportTreeList };
