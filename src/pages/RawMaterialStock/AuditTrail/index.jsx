import React from "react";

import { Grid } from "@mui/material";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";

import useRawMaterialAuditTrail from "../../../hooks/services/useRawMaterialAuditTrail";

// Shows who entered/edited a day's stock numbers and when, for reconciliation.
const AuditTrail = ({ open, setOpen, stockEntryId }) => {
  const { data: auditData } = useRawMaterialAuditTrail({ stockEntryId });

  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "User",
      accessor: "user",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Action",
      accessor: "action",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Timestamp",
      accessor: "timestamp",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Changes",
      accessor: "changes",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "30%",
    },
  ];

  return (
    <DialogBox
      title="Audit Trail"
      open={open}
      setOpen={setOpen}
      maxWidth="md"
      height="500px"
      children={
        <Grid container>
          <Grid item xs={12}>
            {auditData && (
              <LazyLoadingTable
                columns={columns}
                data={auditData}
                hiddenColumns={["id"]}
                maxHeightInRows={10}
                onClickTableRow={() => {}}
                customProps={{ height: 400 }}
              />
            )}
          </Grid>
        </Grid>
      }
    />
  );
};

export default AuditTrail;
