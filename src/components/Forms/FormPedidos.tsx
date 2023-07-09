import { useState, useEffect } from "react";
import { tokens } from "../../layouts/Theme";
import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Order } from "../../utils/types";
import { addNewOrder } from "../../api/tracking";
import MasiveOrderForm from "./MasiveOrderForm";

const tipoEnvio = [
  {
    value: "4",
    label: "4 horas",
  },
  {
    value: "6",
    label: "6 horas",
  },
  {
    value: "8",
    label: "8 horas",
  },
  {
    value: "24",
    label: "24 horas",
  },
];

type Props = {};

function FormPedidos({}: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [order, setOrder] = useState<Order>({
    id: "",
    coord: {
      x: 0,
      y: 0,
    },
    numPaq: 0,
    hoursLimit: 0,
  });
  const { coord, numPaq, hoursLimit } = order;
  const { x, y } = coord;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if ([numPaq, hoursLimit].includes(0)) {
      //Colocar aqui algun useState para la validación de registro de pedidos
      return;
    }
    //console.log(order);
    console.log(order);
    const aux = await addNewOrder(order);
    console.log(aux);
    setOrder({
      id: "",
      coord: {
        x: 0,
        y: 0,
      },
      numPaq: 0,
      hoursLimit: 0,
    });
  };

  const handleChange = (e: SelectChangeEvent) => {
    setOrder({ ...order, hoursLimit: parseInt(e.target.value as string) });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography
        color={colors.grey[200]}
        variant="h5"
        fontWeight="600"
        sx={{
          paddingX: "5px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Ingreso de Pedidos
      </Typography>

      <TextField
        id="numPaq"
        label="Número de paquetes"
        placeholder="ejm. 8, 10, 20"
        type="number"
        required
        multiline
        size="small"
        sx={{ marginBottom: "10px", width: "180px" }}
        value={isNaN(numPaq) ? 0 : numPaq}
        onChange={(e) =>
          setOrder({ ...order, numPaq: parseInt(e.target.value) })
        }
      />
      <FormControl sx={{ marginBottom: "10px" }}>
        <InputLabel id="hoursLimit">Horas límite</InputLabel>
        <Select
          labelId="hoursLimit"
          id="hoursLimit"
          value={hoursLimit.toString()}
          label="Horas límite"
          onChange={handleChange}
          size="small"
          sx={{ width: "180px" }}
        >
          <MenuItem value={0}>Seleccione una fecha</MenuItem>
          <MenuItem value={4}>4 horas</MenuItem>
          <MenuItem value={6}>6 horas</MenuItem>
          <MenuItem value={8}>8 horas</MenuItem>
          <MenuItem value={24}>24 horas</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="coordenadaX"
        label="Coordenada X"
        placeholder="ejm. 25, 40, 78"
        type="number"
        required
        multiline
        size="small"
        sx={{ marginBottom: "10px", width: "180px" }}
        value={isNaN(x) ? 0 : x}
        onChange={(e) =>
          setOrder({
            ...order,
            coord: { ...order.coord, x: parseInt(e.target.value) },
          })
        }
      />
      <TextField
        id="outlined-textarea"
        label="Coordenada Y"
        placeholder="ejm. 25, 40, 78"
        type="number"
        required
        multiline
        size="small"
        sx={{ marginBottom: "10px", width: "180px" }}
        value={isNaN(y) ? 0 : y}
        onChange={(e) =>
          setOrder({
            ...order,
            coord: { ...order.coord, y: parseInt(e.target.value) },
          })
        }
      />

      <Button
        variant="contained"
        sx={{ mt: 1.5, mb: 2, height: "30px" }}
        type="submit"
      >
        Registrar
      </Button>
      <MasiveOrderForm />
    </Box>
  );
}

export default FormPedidos;
