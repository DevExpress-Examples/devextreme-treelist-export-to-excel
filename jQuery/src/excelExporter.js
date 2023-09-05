const MIN_COLUMN_WIDTH = 10;
const PIXELS_PER_INDENT = 10;
const PIXELS_PER_EXCEL_WIDTH_UNIT = 8;

class TreeListHelpers {
  constructor(component, worksheet, options) {
    this.component = component;
    this.worksheet = worksheet;
    this.columns = this.component.getVisibleColumns();

    this.rootValue = this.component.option('rootValue');
    this.parentIdExpr = this.component.option('parentIdExpr');
    this.keyExpr =
      this.component.option('keyExpr') || this.component.getDataSource().key();
    this.dataStructure = this.component.option('dataStructure');

    this.worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };
  }

  _getData() {
    return this.component
      .getDataSource()
      .store()
      .load()
      .then((result) => this._processData(result));
  }

  _processData(data) {
    let rows = data;
    if (this.dataStructure === 'plain')
      rows = this._convertToHierarchical(rows);
    return this._depthDecorator(rows);
  }

  // adds the depth for hierarchical data
  _depthDecorator(data, depth = 0) {
    const result = [];

    data.forEach((node) => {
      result.push({
        ...node,
        depth,
        items: this._depthDecorator(node.items || [], depth + 1),
      });
    });

    return result;
  }

  // converts plain to hierarchical
  _convertToHierarchical(data, id = this.rootValue) {
    const result = [];
    const roots = [];

    data.forEach((node) => {
      if (node[this.parentIdExpr] === id) roots.push(node);
    });

    roots.forEach((node) => {
      result.push({
        ...node,
        items: this._convertToHierarchical(data, node[this.keyExpr]),
      });
    });

    return result;
  }

  _exportRows(rows) {
    rows.forEach((row) => {
      this._exportRow(row);

      if (this._hasChildren(row)) this._exportRows(row.items);
    });
  }

  _exportRow(row) {
    const insertedRow = this.worksheet.addRow(row);
    insertedRow.outlineLevel = row.depth;
    this.worksheet.getCell(`A${insertedRow.number}`).alignment = {
      indent: row.depth * 2,
    };
  }

  _generateColumns() {
    this.worksheet.columns = this.columns.map(({ caption, dataField }) => ({
      header: caption,
      key: dataField,
    }));
  }

  _hasChildren(row) {
    return row.items && row.items.length > 0;
  }

  _autoFitColumnsWidth() {
    this.worksheet.columns.forEach((column) => {
      let maxLength = MIN_COLUMN_WIDTH;
      if (column.number === 1) {
        // first column
        column.eachCell((cell) => {
          const indent =
            cell.alignment &&
            cell.alignment.indent *
              (PIXELS_PER_INDENT / PIXELS_PER_EXCEL_WIDTH_UNIT);
          const valueLength = cell.value.toString().length;

          if (indent + valueLength > maxLength)
            maxLength = indent + valueLength;
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

    return this._getData().then((rows) => {
      this._generateColumns();
      this._exportRows(rows);
      this._autoFitColumnsWidth();
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
