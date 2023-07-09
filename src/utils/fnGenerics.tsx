import dayjs from "dayjs";
import { tunerDetails } from "./dataConfig";
import {
  Blocker,
  BlockerBack,
  Data,
  Vehicle,
  Task,
  VehicleBack,
} from "./types";

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function updateFormatData(data: Data) {
  //Esto estoy trabajando
  const arrValues: any[] = [];
  let cont = 0;
  let estado = "";
  data.autos.forEach((auto) => {
    if (auto.state === 2) {
      let detail: Task[] = [];
      let totalPaquetes = 0;
      if (auto.tasks.length === 1) {
        estado = "Retornando";
      } else {
        estado = "En camino";
        auto.tasks.forEach((task) => {
          let taskAux = {
            clientId: task.clientId,
            dateLimit: task.dateLimit,
            destination: task.destination,
            numPackages: task.numPackages,
          };
          detail.push(taskAux);
          totalPaquetes += task.numPackages;
        });
      }
      const obj = {
        id: cont,
        placa: auto.id,
        tipo: auto.type,
        numpaquetes: totalPaquetes,
        estado: estado,
        detail: detail,
      };

      arrValues.push(obj);
      cont++;
    }
  });
  data.motos.forEach((moto) => {
    if (moto.state === 2) {
      let detail: any[] = [];
      let totalPaquetes = 0;
      if (moto.tasks.length === 1) {
        estado = "Retornando";
      } else {
        estado = "En camino";
        moto.tasks.forEach((task) => {
          let taskAux = {
            clientId: task.clientId,
            dateLimit: task.dateLimit,
            destination: task.destination,
            numPackages: task.numPackages,
          };
          //console.log("Mi task es: ", taskAux);
          detail.push(taskAux);
          totalPaquetes += task.numPackages;
        });
      }
      const obj = {
        id: cont,
        placa: moto.id,
        tipo: moto.type,
        numpaquetes: totalPaquetes,
        estado: estado,
        detail: detail,
      };
      // console.log("Mi objeto es: ", obj);
      arrValues.push(obj);
      cont++;
    }
  });
  return arrValues;
}

// export const positionSimulationDummy = (data: Data) => {
//     const newAutos:  Map<string, Vehicle> = new Map();
//     data.autos.forEach(auto => {
//         const newPos = {
//             x: 0,
//             y: 0
//         }
//         const newAuto = {
//             ...auto,
//             coord: newPos
//         }
//         newAutos.push(newAuto)
//     });

//     const newData = {
//         ...data,
//         autos: newAutos
//     }
//     return newData
// }
type BackData = {
  autos: VehicleBack[];
  motos: VehicleBack[];
  blockers: BlockerBack[];
};

function formaterBackDates(date: string) {
  // 2023-01-01T00:43:00
  const arrTimes = date.split("T");
  const arrDate = arrTimes[0].split("-");
  const arrDay = arrTimes[1].split(":");
  const formartedDate = new Date(
    Number(arrDate[0]),
    Number(arrDate[1]) - 1,
    Number(arrDate[2])
  );
  const mSecondsOfTheDay =
    1000 *
    (Number(arrDay[0]) * 3600 + Number(arrDay[1]) * 60 + Number(arrDay[2]));
  return new Date(formartedDate.getTime() + mSecondsOfTheDay);
}

export const updateStates = (newData: BackData, oldData: Data) => {
  // console.log(newData);
  for (let i = 0; i < newData.autos.length; i++) {
    const element = newData.autos[i];
    // const id = oldData.autos.get(element.id)?.id
    // let index = i
    // if(id) index = id
    // const auto: Vehicle = vehicleFormater(element, index)
    const auto: Vehicle = vehicleFormater(element, element.id);
    oldData.autos.set(element.id, auto);
  }
  for (let i = 0; i < newData.motos.length; i++) {
    const element = newData.motos[i];
    // const id = oldData.motos.get(element.id)?.id
    // let index = i
    // if(id) index = id
    // const moto: Vehicle = vehicleFormater(element, index)
    const moto: Vehicle = vehicleFormater(element, element.id);
    oldData.motos.set(element.id, moto);
  }

  let xBloquers = newData.blockers.map((item, index) => {
    return {
      id: index,
      init: formaterBackDates(item.init),
      fin: formaterBackDates(item.fin),
      coords: item.coords,
    };
  });
  const data = {
    autos: oldData.autos,
    motos: oldData.motos,
    blockers: xBloquers,
  };
  // console.log('data', data)
  return data;
};

function vehicleFormater(element: VehicleBack, i: string): Vehicle {
  return {
    id: i,
    type: element.type === "CAR" ? "Auto" : "Moto",
    state: element.state === "DAMAGED" ? 3 : element.state === "BUSY" ? 2 : 1,
    orders: [],
    coord: {
      x: element.coord.x,
      y: element.coord.y,
    },
    plannedPath: element.plannedPath,
    tasks: element.tasks,
    breakdownType: element.breakdownType,
  };
}

export const getVehicles = (vehicles: Map<string, Vehicle>) => {
  const arr: Vehicle[] = [];
  // console.log("get", vehicles)
  vehicles.forEach((item) => {
    arr.push(item);
  });
  return arr;
};

export const getTunerValue = (tunerTime: number) => {
  let value = 1;
  tunerDetails.forEach((element) => {
    if (element.id === tunerTime) value = element.scale;
  });
  return value;
};

export const formaterTime = (val: number) => {
  if (val < 10) return `0${val}`;
  return `${val}`;
};
export const formaterDate = (date: string) => {
  const arrNums = date.split("/");
  let newDate = "";
  arrNums.forEach((item, index) => {
    newDate += `${index === 0 ? "" : "/"}${formaterTime(Number(item))}`;
  });
  return newDate;
};

export const parseDateToSeconds = (
  dateNowStr: string,
  dateInit: Date,
  tunerRatio: number
) => {
  const dateNow = new Date(dateNowStr);
  const diff = (dateNow.getTime() - dateInit.getTime()) / 1000;
  // console.log(diff);
  // console.log(dateNowStr);
  return diff / tunerRatio;
};
