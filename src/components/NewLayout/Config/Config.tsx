import { useContext, useState, useEffect } from "react";
import { ReferenceDataContext } from "../../../providers/ReferenceDataContext";
import { Data, GeneralConfig, Vehicle } from "../../../utils/types";
import {
  formaterDate,
  getTunerValue,
  parseDateToSeconds,
  updateStates,
} from "../../../utils/fnGenerics";
import { setupApi, statusApi, stopApi, timeApi } from "../../../api/tracking";
import "../../deprecated/Navbar/Navbar.css";
import "../../deprecated/Monitor/Monitor.css";
import "./Config.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalSimulEnding from "../../ModalSimulEnding/ModalSimulEnding";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import { tokens } from "../../../layouts/Theme";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import dayjs from "dayjs";
import VehiclesStatesUpt from "../VehiclesStates/VehiculesStatesUpt";

type ConfigProps = {
  generalConfig: GeneralConfig;
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  simulSeconds: number;
  setSimulSeconds: React.Dispatch<React.SetStateAction<number>>;
};

// let simulSeconds = 0;
let setUpStarted = false;
let timerId: NodeJS.Timer;

function Config({
  generalConfig,
  setGeneralConfig,
  data,
  setData,
  simulSeconds,
  setSimulSeconds,
}: ConfigProps) {
  const [showModal, setShowModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { dataContext, setDataContext } = useContext(ReferenceDataContext);

  interface CalendarButtonProps {
    enviarFecha: (parametro: Date | null) => void;
  }
  const CalendarButton: React.FC<CalendarButtonProps> = ({ enviarFecha }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      // console.log("Cambiando fecha");
      setSelectedDate(date);
      // console.log("date = a", date);
      const fecha = date;
      // console.log("Se asigno la fecha a var fecha valor= ", fecha);
      enviarFecha(fecha);
      // console.log("Se invoco a enviarFecha(fecha)");
      // console.log("----->", fecha);
      if (fecha !== null) {
        setGeneralConfig({
          ...generalConfig,
          date: fecha,
        });
      }
    };
    return (
      <DatePicker
        className=""
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={<span className="bi-calendar-week-fill" />}
      ></DatePicker>
    );
  };
  const [fechita, setFechita] = useState<Date | null>(null);

  const recibirFecha = (valor: Date | null) => {
    // console.log("Recibiendo fecha");
    setFechita(valor);
    generalConfig.date = valor ? valor : new Date(0);
  };

  const startSimulation = () => {
    setGeneralConfig({
      ...generalConfig,
      started: !generalConfig.started,
    });
    startStopQueries(!generalConfig.started);
  };

  const startStopQueries = async (start: boolean) => {
    if (start) {
      /* Configuramos el inicio de la simulación */
      if (simulSeconds === 0) {
        setCollapsed(false);
        const myDate = dayjs(generalConfig.date);
        const su = await setupApi(
          generalConfig.simulationType !== 1 ? myDate.format("DD/MM/YYYY") : "",
          generalConfig.simulationType === 2 ? 7 : 1000,
          getTunerValue(generalConfig.tunerTime)
        );
        setUpStarted = su;
      }
      if (setUpStarted === true) {
        /*Nos aseguramos que la simulación haya empezado*/
        timerId = setInterval(async () => {
          /* Simulación está corriendo */
          let newData;
          const dateNow = await timeApi();
          if (dateNow !== null && !dateNow.err) {
            setSimulSeconds(
              parseDateToSeconds(
                dateNow,
                generalConfig.date,
                getTunerValue(generalConfig.tunerTime)
              )
            );
          }
          // console.log(simulSeconds);
          newData = await statusApi();
          //console.log("Mi nueva data recibida es:", newData);

          if (newData.status === "collapse") {
            stopTimer(true, false);
            return;
          } else if (
            newData.status === "stopped" ||
            (generalConfig.simulationType === 2 &&
              simulSeconds * getTunerValue(generalConfig.tunerTime) >=
                60 * 60 * 24 * 7)
          ) {
            stopTimer(false, false);
            return;
          } else if (
            newData.status === "running" &&
            newData.autos &&
            newData.motos
          ) {
            setData(updateStates(newData, data));
            console.log("La nueva data antes de formatearla es: ", data);
          }
        }, 80);
      } else {
        alert("ERROR 505!");
        console.log("Error", setUpStarted);
      }
    } else {
      stopTimer(false, true);
    }
  };
  const stopTimer = async (collapse: boolean, tapButton: boolean) => {
    await stopApi();
    clearInterval(timerId);
    setCollapsed(collapse);
    setShowModal(true);
    if (!tapButton) {
      setGeneralConfig({
        ...generalConfig,
        started: false,
      });
    }
  };

  const getSimulationDate = () => {
    const dateSimulation = new Date(
      generalConfig.date.getTime() +
        simulSeconds * getTunerValue(generalConfig.tunerTime) * 1000
    );
    const dateToSimulString = dateSimulation.toLocaleString();
    const arrDate = dateToSimulString.split(",");
    //return `${formaterDate(arrDate[0])}${arrDate[1]}`;
    return `${formaterDate(arrDate[0])}`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSimulSeconds(0);
  };

  const resetData = () => {
    // Regresamos todo a su estado inicial
    const autos: Map<string, Vehicle> = new Map();
    const motos: Map<string, Vehicle> = new Map();
    setData({
      autos,
      motos,
      blockers: [],
    });
  };

  const handleChange = (e: SelectChangeEvent) => {
    resetData();
    console.log(parseInt(e.target.value));
    const tipoSimulacion = parseInt(e.target.value);
    setGeneralConfig({
      ...generalConfig,
      simulationType: tipoSimulacion,
      tunerTime: tipoSimulacion === 1 ? 0 : tipoSimulacion === 2 ? 2 : 2,
    });
  };
  useEffect(() => {
    console.log(
      `Tipo de simulacion: ${generalConfig.simulationType} y el Tipo de tunerTime es: ${generalConfig.tunerTime}`
    );
  }, [generalConfig]);

  return (
    <Paper
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "30%",
        alignItems: "center",
        width: "200px",
      }}
    >
      <Typography
        color={colors.grey[100]}
        variant="h5"
        fontWeight="600"
        sx={{
          padding: "10px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "8px",
          marginBottom: "15px",
        }}
      >
        Configuración
      </Typography>

      <FormControl sx={{ marginBottom: "10px" }}>
        <InputLabel id="simultype">Tipo de simulación</InputLabel>
        <Select
          labelId="simultype"
          id="simultype"
          value={generalConfig.simulationType.toString()}
          label="Tipo de simulación"
          onChange={handleChange}
          size="small"
          sx={{ width: "175px" }}
        >
          <MenuItem value={1}>Operaciones diarias</MenuItem>
          <MenuItem value={2}>Simulación semanal</MenuItem>
          <MenuItem value={3}>Simulación hasta el colapso</MenuItem>
        </Select>
      </FormControl>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border={`0.5px solid #BAB8B8`}
        borderRadius={"3px"}
        paddingX="22px"
        sx={{ marginBottom: "10px" }}
        paddingY="4px"
      >
        <CalendarButton enviarFecha={recibirFecha} />
        <Typography sx={{ marginLeft: "50px" }}>
          {getSimulationDate()}
        </Typography>
      </Box>

      {generalConfig.simulationType !== 1 ? (
        <div className="Navbar_controls_top_button" onClick={startSimulation}>
          <div
            className="Navbar_controls_top_button_icon"
            style={{
              backgroundColor: generalConfig.started ? "#E74C3C" : "#0FA958",
            }}
          >
            {generalConfig.started ? (
              <i className="bi bi-square-fill" style={{ fontSize: "14px" }}></i>
            ) : (
              <i className="bi bi-caret-right-fill"></i>
            )}
          </div>
          <span
            style={{ color: generalConfig.started ? "#E74C3C" : "#0FA958" }}
          >
            {generalConfig.started ? "Terminar" : "Empezar"}
          </span>
        </div>
      ) : (
        <>
          <div className="Navbar_controls_top_button" onClick={startSimulation}>
            <div
              className="Navbar_controls_top_button_icon"
              style={{
                backgroundColor: generalConfig.started ? "#E74C3C" : "#0FA958",
              }}
            >
              {generalConfig.started ? (
                <i
                  className="bi bi-square-fill"
                  style={{ fontSize: "14px" }}
                ></i>
              ) : (
                <i className="bi bi-caret-right-fill"></i>
              )}
            </div>
            <span
              style={{ color: generalConfig.started ? "#E74C3C" : "#0FA958" }}
            >
              {generalConfig.started ? "Terminar" : "Empezar"}
            </span>
          </div>
        </>
      )}
      <VehiclesStatesUpt data={data} />

      <ModalSimulEnding
        show={showModal}
        handleCloseModal={handleCloseModal}
        collapsed={collapsed}
        simulSeconds={simulSeconds}
        generalConfig={generalConfig}
      />
    </Paper>
  );
}

export default Config;
