import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../layouts/Theme";
import { GridColDef } from "@mui/x-data-grid";
import { Data, Task } from "../../utils/types";
import { autos, motos, blockers } from "../../utils/dataDummy";
import { updateFormatData } from "../../utils/fnGenerics";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import InfoIcon from "@mui/icons-material/Info";
import MiniTable from "./MiniTable";
import Chip from "@mui/material/Chip";
import { blueGrey } from "@mui/material/colors";

const initData: Data = { autos, motos, blockers };

type Props = {
  data: Data;
};

function DetailTable({ data }: Props) {
  const [dataFilas, setDataFilas] = useState<any[]>([]);
  const [specificDetail, setSpecificDetail] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data) {
      setDataFilas(updateFormatData(data));
    }
  }, [data]);

  const handleDatailOpen = (detail: Task[]) => {
    setSpecificDetail(detail);
    handleOpen();
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "placa",
      headerName: "Placa",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
    },
    {
      field: "numpaquetes",
      headerName: "#Paquetes",
      type: Number,
      flex: 1,
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {params.row.estado === "Retornando" && (
              <Chip
                icon={<ArrowCircleLeftIcon />}
                label="En retorno"
                variant="filled"
                color="error"
                size="small"
              />
            )}
            {params.row.estado === "En camino" && (
              <Chip
                icon={<ArrowCircleRightIcon />}
                label="En camino"
                variant="filled"
                color="info"
                size="small"
              />
            )}
          </Box>
        );
      },
    },
    {
      field: "detail",
      headerName: "Detalle",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="50%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            sx={{ backgroundColor: blueGrey }}
            onClick={() => handleDatailOpen(params.row.detail)}
          >
            <InfoIcon />
          </Box>
        );
      },
    },
  ] as GridColDef[];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "50%",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h3"
            sx={{
              textAlign: "center",
              color: "whitesmoke",
              fontWeight: "bold",
            }}
          >
            Detalle del pedido
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <MiniTable specificDetail={specificDetail} />
          </Typography>
        </Box>
      </Modal>

      <Box
        width="100%"
        maxHeight="100%"
        marginX="auto"
        height="318px"
        sx={{
          "& .MuiDataGrid-root": {
            overflowX: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            overflowX: "hidden",
          },
          "& .name-column--cell": {
            overflowX: "hidden",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            overflowX: "hidden",
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "hidden",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            overflowX: "hidden",
            display: "none",
          },
        }}
      >
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                id: false,
                tipo: false,
              },
            },
          }}
          rows={dataFilas}
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default DetailTable;
