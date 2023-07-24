import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormCreater from "app/shared-components/FormCreater";
import axios from "axios";

async function getData(url) {
  let res = await axios.get(url);
  return res.data.data;
}

async function deleteRow(id, url) {
  let res = await axios.delete(url + "/" + id);
  return res.data.data;
}

export default function CustomTable({
  columns,
  title,
  url,
  filterColumns,
  addItem = false,
  customActions = [],
  expand = false,
  rowExpansionTemplate,
}) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);

  useEffect(() => {
    if (url) {
      getData(url).then((res) => {
        setData(res);
      });
    }
  }, [refreshData]);

  const onRowEditComplete = (value) => {
    console.log(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickEdit = () => {
    setEditMode(true);
    setEditData(selectedRows[0]);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickDelete = async () => {
    await deleteRow(selectedRows[0].id, url).then((res) => {
      setRefreshData(!refreshData);
    });
  };

  console.log(selectedRows);
  const header = (
    <div className="table-header flex flex-row justify-between">
      <Typography variant="h6">{title}</Typography>
      <div className="gap-6">
        {selectedRows?.length == 1 && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickEdit}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickDelete}
            >
              <DeleteIcon />
            </Button>
            {customActions.map((action) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => action.func(selectedRows)}
              >
                {action.label}
              </Button>
            ))}
          </>
        )}
        {}
        {addItem && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Button>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{`${title} Create`}</DialogTitle>
        <DialogContent>
          <FormCreater
            edit={editMode}
            editData={editData}
            columns={columns}
            url={url}
            handleClose={handleClose}
            refreshData={setRefreshData}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  return (
    <div className="p-12 card">
      <DataTable
        size="large"
        value={data}
        header={header}
        showGridlines
        responsiveLayout="scroll"
        sortMode="multiple"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate=" {first} ile {last} Görüntüleniyor Toplam: {totalRecords}"
        rows={15}
        rowsPerPageOptions={[15, 20, 50]}
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        filterDisplay="row"
        scrollable
        selectionMode={"checkbox"}
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        emptyMessage="Veri Bulunamadı."
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        {expand && <Column expander={true} style={{ width: "5rem" }} />}
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        {columns.map((col) => (
          <Column
            key={col.key}
            field={col.nestedKey ? col.nestedKey : col.field}
            header={col.header}
            sortable
            filter
            filterPlaceholder={`${col.header} göre filtrele`}
            style={{ minWidth: col.minWidth ? col.minWidth + "px" : "250px" }}
          />
        ))}
      </DataTable>
    </div>
  );
}
