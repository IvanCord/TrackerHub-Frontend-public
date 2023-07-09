import "./VehiclesStates.css";
import { mapConfig } from "../../utils/dataConfig";
import { Data } from "../../utils/types";
import "../../deprecated/Monitor/Monitor.css";

type VehicleProps = {
  circulation: number;
  waiting: number;
  problems: number;
  icon: string;
};

type VSProps = {
  // generalConfig: GeneralConfig,
  // setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
  data: Data;
  // setData: React.Dispatch<React.SetStateAction<Data>>,
  // simulSeconds: number
};

function Monitor({ data }: VSProps) {
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
        if (!item.plannedPath || item.plannedPath.length === 0)
          autosM.waiting++;
        else autosM.circulation++;
      } else autosM.problems++;
    });
    data.motos.forEach((item) => {
      if (item.state === 1) {
        if (!item.plannedPath || item.plannedPath.length === 0)
          motosM.waiting++;
        else motosM.circulation++;
      } else motosM.problems++;
    });

    return [autosM, motosM];
  };

  return (
    <div className="Monitor">
      <div className="Monitor_title">
        <strong>VEHICULOS</strong>
      </div>
      <div className="Monitor_top">
        <div className="Monitor_top_vehicles VS_vehicles">
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
      </div>
    </div>
  );
}

function Vehicle({ circulation, waiting, problems, icon }: VehicleProps) {
  return (
    <div className="Vehicle">
      <div className="Vehicle_icon VS__Vehicle">
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
export default Monitor;
