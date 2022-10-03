// import React from 'react'

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function DataTable(props) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // checkboxSelection
      />
    </div>
    );
  }

export default DataTable;