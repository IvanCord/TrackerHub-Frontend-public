import { mapConfig, vehiclesDetails } from "../utils/dataConfig";
import { API_VERSION, BASE_PATH } from "../config/conection";
import { Breakdown, Order } from "../utils/types";
import axios from "axios";

export function setupApi(dateinit: string, days: number, ratio: number) {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/setup`;

  const req = {
    mapMaxX: mapConfig.xkm,
    mapMaxY: mapConfig.ykm,
    warehouseX: mapConfig.xAlm,
    warehouseY: mapConfig.yAlm,
    numCars: vehiclesDetails.autos.total,
    numMotorcycles: vehiclesDetails.motos.total,
    date: dateinit,
    simulationDays: days,
    timeRatio: ratio,
  };
  console.log("Se envía:", req);
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
    body: JSON.stringify(req),
  };

  return fetch(url, params)
    .then((response) => {
      // console.log(mapConfig, vehiclesDetails, dateinit, days, ratio);
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function statusApi() {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/status`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function timeApi() {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/time`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function addNewOrder(order: Order) {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/orders/new`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
    body: JSON.stringify({
      posX: order.coord.x,
      posY: order.coord.y,
      numPaq: order.numPaq,
      hoursLimit: order.hoursLimit,
    }),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function addNewBreakdown(breakdown: Breakdown) {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/breakdown`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
    body: JSON.stringify({
      vehicleId: breakdown.vehicleId,
      type: breakdown.type,
    }),
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function stopApi() {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/stop`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: PANDA_KEY
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => data)
    .catch((err) => {
      return {
        err,
        success: false,
      };
    });
}

export function ordersBulkApi(file: File) {
  const url = `${BASE_PATH}/api/${API_VERSION}/tracking/orders/bulk`;

  const formData = new FormData();
  formData.append("file", file);

  const params = {
    method: "POST",
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    body: formData
}

return axios.post(url, formData, {
  headers: {
      "Content-type": "multipart/form-data",
  }
});


return fetch(url, params)
    .then(response => {
        return response.json()
    })
    .then(result => {
      console.log(result)
      return {result,
      success: true}
    })
    .catch(err => {
        return {
            err,
            success: false
        };
    })
}
