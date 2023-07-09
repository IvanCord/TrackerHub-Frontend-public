import { Form } from "react-bootstrap";
import "./Monitor.css";
import { mapConfig, tunerDetails } from "../../../utils/dataConfig";
import { Data, GeneralConfig } from "../../../utils/types";
import { formaterDate, getTunerValue } from "../../../utils/fnGenerics";

//calendario
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type VehicleProps = {
  circulation: number;
  waiting: number;
  problems: number;
  icon: string;
};

type PackStateProps = {
  text: string;
  value: number;
  color: string;
};

type MonitorProps = {
  generalConfig: GeneralConfig;
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  simulSeconds: number;
};

function Monitor({
  generalConfig,
  setGeneralConfig,
  data,
  setData,
  simulSeconds,
}: MonitorProps) {
  const getVehiclesMonitor = () => {
    const autosM = {
      circulation: 0,
      waiting: 0,
      problems: 0,
      icon: "car-front-fill",
    };
    const motosM = {
      circulation: 0,
      waiting: 0,
      problems: 0,
      icon: "bicycle",
    };
    data.autos.forEach((item) => {
      if (item.state === 1) {
        if (item.coord.x === mapConfig.xAlm && item.coord.y === mapConfig.yAlm)
          autosM.waiting++;
        else autosM.circulation++;
      } else autosM.problems++;
    });
    data.motos.forEach((item) => {
      if (item.state === 1) {
        if (item.coord.x === mapConfig.xAlm && item.coord.y === mapConfig.yAlm)
          motosM.waiting++;
        else motosM.circulation++;
      } else motosM.problems++;
    });

    return [autosM, motosM];
  };
  const getpackStatesMonitor = () => {
    const delivM = {
      text: "Entregado",
      value: 0,
      color: "#09A2B0",
    };
    const onThWM = {
      text: "En camino",
      value: 0,
      color: "#0DE8FC",
    };
    const pendiM = {
      text: "Pendiente",
      value: 0,
      color: "#F6BA32",
    };

    // data.autos.forEach(item => {
    //     // TO DO: Cosolidar data para tener un array de pedidos, por ahora 5
    //     // TO DO: falta de motos
    //     item.orders.forEach(order => {
    //         if(order.state===1) pendiM.value++
    //         else if(order.state===2) onThWM.value++
    //         else if(order.state===3) delivM.value++
    //     })
    // })

    return [delivM, onThWM, pendiM];
  };
  interface CalendarButtonProps {
    enviarFecha: (parametro: Date | null) => void;
  }
  //calendario
  const CalendarButton: React.FC<CalendarButtonProps> = ({ enviarFecha }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    console.log("Aun no enviamos fecha");

    const handleDateChange = (date: Date | null) => {
      console.log("Cambiando fecha");
      setSelectedDate(date);
      console.log("date = a", date);
      const fecha = date;
      console.log("Se asigno la fecha a var fecha valor= ", fecha);
      enviarFecha(fecha);
      console.log("Se invoco a enviarFecha(fecha)");
    };
    return (
      <div>
        <DatePicker
          className="Monitor_top_date"
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<span className="bi-calendar-week-fill" />}
        ></DatePicker>
        <h1>{selectedDate?.toLocaleDateString()}</h1>
      </div>
    );
  };
  const [fechita, setFechita] = useState<Date | null>(null);

  const recibirFecha = (valor: Date | null) => {
    console.log("Recibiendo fecha");
    setFechita(valor);
    generalConfig.date = valor ? valor : new Date(0);
  };
  //fin calendario

  const getSimulationDate = () => {
    const dateSimulation = new Date(
      generalConfig.date.getTime() +
        simulSeconds * getTunerValue(generalConfig.tunerTime) * 1000
    );
    const dateToSimulString = dateSimulation.toLocaleString();
    const arrDate = dateToSimulString.split(",");
    return `${formaterDate(arrDate[0])}${arrDate[1]}`;
  };

  return (
    <div className="Monitor">
      <div className="Monitor_title">
        <span>MONITOR</span>
      </div>
      <div className="Monitor_top">
        <div className="Monitor_top_date">
          <div className="Monitor_top_date_days">
            <div>
              <CalendarButton enviarFecha={recibirFecha} />
            </div>
            <span>{getSimulationDate()}</span>
          </div>
          <div className="Monitor_top_date_tuner">
            <Form.Select
              className="Monitor_top_date_tuner_select"
              defaultValue={generalConfig.tunerTime.toString()}
              name="tuner"
              onChange={(e) => {
                setGeneralConfig({
                  ...generalConfig,
                  tunerTime: Number(e.target.value),
                });
              }}
            >
              {tunerDetails.map((item, key) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="Monitor_top_vehicles">
          {getVehiclesMonitor().map((item, index) => (
            <Vehicle
              key={index}
              circulation={item.circulation}
              waiting={item.waiting}
              problems={item.problems}
              icon={item.icon}
            />
          ))}
        </div>
        <div className="Monitor_top_packets">
          <span>Estado de los pedidos:</span>
          <div className="Monitor_top_packets_states">
            {getpackStatesMonitor().map((item, index) => (
              <PackState
                key={index}
                text={item.text}
                value={item.value}
                color={item.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Vehicle({ circulation, waiting, problems, icon }: VehicleProps) {
  return (
    <div className="Vehicle">
      <div className="Vehicle_icon">
        <i className={`Vehicle_icon_i bi bi-${icon}`}></i>
      </div>
      <div className="Vehicle_data">
        <div className="Vehicle_data_item veh_d1">
          <span>En circulación:</span>
          <span className="Vehicle_data_item_val">{circulation}</span>
        </div>
        <div className="Vehicle_data_item veh_d2">
          <span>En espera:</span>
          <span className="Vehicle_data_item_val">{waiting}</span>
        </div>
        <div className="Vehicle_data_item veh_d3">
          <span>Con problemas:</span>
          <span className="Vehicle_data_item_val">{problems}</span>
        </div>
      </div>
    </div>
  );
}
function PackState({ text, value, color }: PackStateProps) {
  return (
    <div className="PackState" style={{ color: color }}>
      <div className="PackState_top">
        <i className="bi bi-circle-fill"></i>
        <span>{text}</span>
      </div>
      <div className="PackState_bottom">
        <span>{value}</span>
      </div>
    </div>
  );
}

export default Monitor;
