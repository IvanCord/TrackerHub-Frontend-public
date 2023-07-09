import { useState, useEffect } from "react";
import "./VehiclesStates.css";
import { Data } from "../../../utils/types";
import { tokens } from "../../../layouts/Theme";
import "../../deprecated/Monitor/Monitor.css";
import { Box, Typography, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

type VSProps = {
  // generalConfig: GeneralConfig,
  // setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
  data: Data;
  // setData: React.Dispatch<React.SetStateAction<Data>>,
  // simulSeconds: number
};

type VehicleDetail = {
  tipo: string;
  circulation: number;
  waiting: number;
  problems: number;
  icon: string;
};

function VehiclesStatesUpt({ data }: VSProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [autosM, setAutosM] = useState<VehicleDetail>({
    tipo: "Autos",
    circulation: 0,
    waiting: 0,
    problems: 0,
    icon: "car-front-fill",
  });
  const [motosM, setMotosM] = useState<VehicleDetail>({
    tipo: "Motos",
    circulation: 0,
    waiting: 0,
    problems: 0,
    icon: "bicycle",
  });
  const [bloqueosM, setBloqueosM] = useState<VehicleDetail>({
    tipo: "Bloqueos",
    circulation: 0,
    waiting: 0,
    problems: 0,
    icon: "pause-circle-fill",
  });

  //circulation = incidente simple, waiting = incidente medio, problems = incidente grave
  const [averiasM, setAveriasM] = useState<VehicleDetail>({
    tipo: "Averias",
    circulation: 0,
    waiting: 0,
    problems: 0,
    icon: "sign-stop-fill",
  });

  useEffect(() => {
    let incidentesSimples = 0;
    let incidentesMedios = 0;
    let incidentesGraves = 0;

    let autosWaiting = 0;
    let autosCirculation = 0;
    let autosProblems = 0;

    data.autos.forEach((item) => {
      if (item.state === 1) autosWaiting++;
      else if (item.state === 2) autosCirculation++;
      if (item.state === 3) {
        autosProblems++;
        if (item.breakdownType === 1) incidentesSimples++;
        if (item.breakdownType === 2) incidentesMedios++;
        if (item.breakdownType === 3) incidentesGraves++;
      }
    });

    setAutosM((prevAutosM) => ({
      ...prevAutosM,
      waiting: autosWaiting,
      circulation: autosCirculation,
      problems: autosProblems,
    }));

    let motosWaiting = 0;
    let motosCirculation = 0;
    let motosProblems = 0;

    data.motos.forEach((item) => {
      if (item.state === 1) motosWaiting++;
      else if (item.state === 2) motosCirculation++;
      if (item.state === 3) {
        motosProblems++;
        if (item.breakdownType === 1) incidentesSimples++;
        if (item.breakdownType === 2) incidentesMedios++;
        if (item.breakdownType === 3) incidentesGraves++;
      }
    });

    setMotosM((prevMotosM) => ({
      ...prevMotosM,
      waiting: motosWaiting,
      circulation: motosCirculation,
      problems: motosProblems,
    }));

    setBloqueosM((prevBloqueosM) => ({
      ...prevBloqueosM,
      circulation: data.blockers.length,
    }));

    setAveriasM((prevAveriasM) => ({
      ...prevAveriasM,
      circulation: incidentesSimples,
      waiting: incidentesMedios,
      problems: incidentesGraves,
    }));
  }, [data]);

  return (
    <Box sx={{ marginY: "auto" }}>
      {[autosM, motosM, bloqueosM, averiasM].map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "20px",
            padding: "1px 6px",
            width: "170px",
            border: "1px solid",
            borderColor: colors.primary[400],
            marginBottom: "5px",
          }}
        >
          <Box>
            <Typography
              color={colors.greenAccent[400]}
              variant="h5"
              fontSize="15px"
              fontWeight="500"
            >
              {item.tipo}
            </Typography>
            <i className={`Vehicle_icon_i bi bi-${item.icon}`}></i>
          </Box>
          {item.tipo === "Bloqueos" ? (
            <>
              <Tooltip title="Calles bloqueadas" arrow>
                <Box
                  sx={{
                    backgroundColor: colors.redAccent[500],
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {item.circulation}
                </Box>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip
                title={
                  item.tipo === "Averias"
                    ? "Incidente simple"
                    : "En circulación"
                }
                arrow
              >
                <Box
                  sx={{
                    backgroundColor:
                      item.tipo === "Averias"
                        ? colors.yellow[100]
                        : colors.greenAccent[500],
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {item.circulation}
                </Box>
              </Tooltip>
              <Tooltip
                title={
                  item.tipo === "Averias" ? "Incidente medio" : "En espera"
                }
                arrow
              >
                <Box
                  sx={{
                    backgroundColor:
                      item.tipo === "Averias"
                        ? colors.yellow[200]
                        : colors.blueAccent[500],
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {item.waiting}
                </Box>
              </Tooltip>
              <Tooltip
                title={
                  item.tipo === "Averias" ? "Incidente grave" : "Con avería"
                }
                arrow
              >
                <Box
                  sx={{
                    backgroundColor:
                      item.tipo === "Averias"
                        ? colors.yellow[300]
                        : colors.redAccent[600],
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {item.problems}
                </Box>
              </Tooltip>
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
export default VehiclesStatesUpt;
