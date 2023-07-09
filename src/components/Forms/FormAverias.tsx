import { useState, useEffect } from "react";
import { tokens } from "../../layouts/Theme";
import { Box, Typography, useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Order, Breakdown } from "../../utils/types";
import { addNewBreakdown } from "../../api/tracking";
import { Data } from "../../utils/types";
import { Blocker, Vehicle } from "../../utils/types";

type Props = {
  data: Data;
};

export default function FormAverias({ data }: Props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vehiclesAvailable, setvehiclesAvailable] = useState<Vehicle[]>([]);

  const [breakdown, setBreakdown] = useState<Breakdown>({
    vehicleId: "",
    type: 0,
  });
  const { vehicleId, type } = breakdown;

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (type === 0) {
      //No se guarda -> podría agregarle despues alguna opción para mostrar un mensaje de ingreso valido
      return;
    }

    if (vehicleId === "") {
      return;
    }
    //console.log(order);

    const aux = await addNewBreakdown(breakdown);
    //console.log(aux);
    setBreakdown({
      vehicleId: "",
      type: 0,
    });
  };

  const handleChangeVehicle = (e: SelectChangeEvent) => {
    setBreakdown({ ...breakdown, vehicleId: e.target.value as string });
  };
  const handleChangeType = (e: SelectChangeEvent) => {
    setBreakdown({ ...breakdown, type: parseInt(e.target.value as string) });
  };

  useEffect(() => {
    const updatedVehiclesAvalaible: Vehicle[] = [];

    data.autos.forEach((item) => {
      if (item.state === 2) {
        updatedVehiclesAvalaible.push(item);
      }
    });
    data.motos.forEach((item) => {
      if (item.state === 2) {
        updatedVehiclesAvalaible.push(item);
      }
    });

    setvehiclesAvailable(updatedVehiclesAvalaible);
    console.log("Los vehiculos disponibles son: ", vehiclesAvailable);
  }, [data]);

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
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
        color={colors.grey[100]}
        variant="h5"
        fontWeight="600"
        sx={{
          padding: "5px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Ingreso de Averias
      </Typography>

      <FormControl sx={{ marginBottom: "10px" }}>
        <InputLabel id="transitVehicle">Vehículo en tránsito</InputLabel>
        <Select
          labelId="transitVehicle"
          id="transitVehicle"
          value={vehicleId === "" ? "0" : vehicleId}
          label="Vehículo en tránsito"
          onChange={handleChangeVehicle}
          size="small"
          sx={{ width: "180px" }}
        >
          <MenuItem value={0}>Seleccione un vehículo</MenuItem>
          {vehiclesAvailable.map((vehicle) => (
            <MenuItem key={vehicle.id} value={vehicle.id}>
              {vehicle.id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ marginBottom: "10px" }}>
        <InputLabel id="faultType">Tipo de avería</InputLabel>
        <Select
          labelId="faultType"
          id="faultType"
          value={type.toString()}
          label="Tipo de avería"
          onChange={handleChangeType}
          size="small"
          sx={{ width: "180px" }}
        >
          <MenuItem value={0}>Selecciona un tipo</MenuItem>
          <MenuItem value={1}>Incidente simple</MenuItem>
          <MenuItem value={2}>Incidente medio</MenuItem>
          <MenuItem value={3}>Incidente grave</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" sx={{ mt: 2.5 }} type="submit">
        Registrar
      </Button>
    </Box>
  );
}
