import { useRef, useEffect, useState } from "react";
import "./Map.css";
import {
  Blocker,
  Coord,
  Data,
  GeneralConfig,
  Order,
  Vehicle,
} from "../../utils/types";
import { getVehicles } from "../../utils/fnGenerics";
import { mapConfig } from "../../utils/dataConfig";
import ModalBreakdowns from "../ModalBreakdowns/ModalBreakdowns";

interface CanvasProps {
  width: number;
  height: number;
  data: Data;
}

const Canvas = ({ width, height, data }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // console.log('useEffect', data.motos)
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, width, height); // Limpiar dibujos del canvas
        drawMap(context, width, height, "#E5E5E5", 1);
        data.blockers.forEach((blocker) => {
          drowSequence(blocker.coords, "red", width, height, context);
        });
        data.autos.forEach((auto) => {
          vehiclePath(auto, context, "#09A2B0");
        });
        data.motos.forEach((moto) => {
          vehiclePath(moto, context, "#6870FA");
        });
      }
    }
  }, [width, height, data]);

  const lineToCoords = (
    i: Coord,
    f: Coord,
    context: CanvasRenderingContext2D | null,
    color: string,
    lineWidth: number
  ) => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.beginPath();
      +context.moveTo(i.x, i.y);
      +context.lineTo(f.x, f.y);
      context.stroke();
      context.closePath();
    }
  };
  const circleInCoord = (
    coord: Coord,
    context: CanvasRenderingContext2D | null,
    color: string
  ) => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.fillStyle = color;
      context.beginPath();
      +context.arc(coord.x, coord.y, 4, 0, Math.PI * 2);
      +context.stroke();
      +context.fill();
      context.closePath();
    }
  };
  const vehiclePath = (
    vehicle: Vehicle,
    context: CanvasRenderingContext2D | null,
    color: string
  ) => {
    const xSize = width / mapConfig.xkm;
    const ySize = height / mapConfig.ykm;

    let xPrevius = -1;
    let yPrevius = -1;

    /* Todo el camino */

    // const sequence = getVertex(vehicle.plannedPath);
    const sequence = vehicle.plannedPath;
    // if (vehicle.id === 7) console.log("moto 8: ", sequence);

    if (vehicle.state === 2) {
      sequence.forEach((coord, index) => {
        if (xPrevius !== -1 && yPrevius !== -1) {
          lineToCoords(
            { x: xPrevius * xSize, y: (mapConfig.ykm - yPrevius) * ySize },
            { x: coord.x * xSize, y: (mapConfig.ykm - coord.y) * ySize },
            context,
            color,
            2
          );
        }
        xPrevius = coord.x;
        yPrevius = coord.y;
        if (index + 1 === sequence.length)
          circleInCoord(
            { x: coord.x * xSize, y: (mapConfig.ykm - coord.y) * ySize },
            context,
            color
          );
      });
    }

    /* Punto a destino */
    // if(!!vehicle.plannedPath && vehicle.plannedPath.length>0) {
    //     const lastIndex = vehicle.plannedPath.length-1
    //     lineToCoords({x: vehicle.coord.x*xSize, y:vehicle.coord.y*ySize}, {x: vehicle.plannedPath[lastIndex].x*xSize, y:vehicle.plannedPath[lastIndex].y*ySize}, context, color, 2)
    //     circleInCoord({x: vehicle.plannedPath[lastIndex].x*xSize, y:vehicle.plannedPath[lastIndex].y*ySize}, context, color)
    // }
  };

  const getVertex = (coords: Coord[]) => {
    const sequence: Coord[] = [];
    // cPrevius2 cPrevius1 item
    let cPrevius2: Coord = {
      x: -1,
      y: -1,
    };
    let cPrevius1: Coord = {
      x: -1,
      y: -1,
    };

    coords.forEach((item, index) => {
      if (
        (cPrevius1.x === -1 && cPrevius1.y === -1) ||
        index + 1 === coords.length
      ) {
        //Extremos
        sequence.push(item);
      } else {
        const xDiff = Math.abs(cPrevius2.x - item.x);
        const yDiff = Math.abs(cPrevius2.y - item.y);

        if (xDiff === 1 && yDiff === 1) {
          //Vertices internos
          sequence.push(item);
        }
      }
      cPrevius2 = cPrevius1;
      cPrevius1 = item;
    });
    return sequence;
  };

  const drowSequence = (
    coords: Coord[],
    color: string,
    width: number,
    height: number,
    context: CanvasRenderingContext2D
  ) => {
    const xSize = width / mapConfig.xkm;
    const ySize = height / mapConfig.ykm;

    let xPrevius = -1;
    let yPrevius = -1;

    coords.forEach((coord) => {
      if (xPrevius !== -1 && yPrevius !== -1) {
        lineToCoords(
          { x: xPrevius * xSize, y: (mapConfig.ykm - yPrevius) * ySize },
          { x: coord.x * xSize, y: (mapConfig.ykm - coord.y) * ySize },
          context,
          color,
          2
        );
      }
      xPrevius = coord.x;
      yPrevius = coord.y;
      circleInCoord(
        { x: coord.x * xSize, y: (mapConfig.ykm - coord.y) * ySize },
        context,
        color
      );
    });
  };

  const drawMap = (
    context: CanvasRenderingContext2D | null,
    width: number,
    height: number,
    color: string,
    lineWidth: number
  ) => {
    const xSize = width / mapConfig.xkm;
    const ySize = height / mapConfig.ykm;

    if (context) {
      for (let i = 1; i < mapConfig.xkm; i++) {
        lineToCoords(
          { x: i * xSize, y: 0 },
          { x: i * xSize, y: height },
          context,
          color,
          lineWidth
        );
      }
      for (let i = 1; i < mapConfig.ykm; i++) {
        lineToCoords(
          { x: 0, y: i * ySize },
          { x: width, y: i * ySize },
          context,
          color,
          lineWidth
        );
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      className="Map_grid_canvas"
    />
  );
};

type MapProps = {
  generalConfig: GeneralConfig;
  data: Data;
};

function Map({ data, generalConfig }: MapProps) {
  const [show, setShow] = useState(false);
  const [idVehicle, setIdVehicle] = useState("");

  // const wSize = ((window.innerHeight - 30) * mapConfig.xkm) / mapConfig.ykm
  const wSize = window.innerWidth - 425;
  const hSize = window.innerHeight - 25;
  const xSize = wSize / mapConfig.xkm; // Distancia entre nodos
  const ySize = hSize / mapConfig.ykm;

  const handleClickVehicle = (id: string, state: number) => {
    if (generalConfig.simulationType === 1 && state===2) {
      // solo si estamos en simulación diaria
      setIdVehicle(id);
      setShow(true);
    }
  };
  const handleClose = () => {
    setIdVehicle("");
    setShow(false);
  };

  return (
    <div className="Map">
      <ModalBreakdowns show={show} handleClose={handleClose} id={idVehicle} />
      <div className="Map_gridContainer">
        <div className="Map_grid">
          <Canvas width={wSize} height={hSize} data={data} />
          <i
            className="bi bi-buildings-fill Canvas_store"
            style={{
              left: `${(xSize * mapConfig.xAlm) - 11}px`,
              bottom: `${(ySize * mapConfig.yAlm) - 11}px`,
            }}
          ></i>
          {getVehicles(data.autos).map((item, key) => (
            <VehicleMap
              id={item.id}
              type={item.type}
              key={key}
              coord={item.coord}
              state={item.state}
              orders={item.orders}
              xSize={xSize}
              ySize={ySize}
              plannedPath={item.plannedPath}
              handleClick={() => handleClickVehicle(item.id, item.state)}
            />
          ))}
          {getVehicles(data.motos).map((item, key) => (
            <VehicleMap
              id={item.id}
              type={item.type}
              key={key}
              coord={item.coord}
              state={item.state}
              orders={item.orders}
              xSize={xSize}
              ySize={ySize}
              plannedPath={item.plannedPath}
              handleClick={() => handleClickVehicle(item.id, item.state)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type VehicleMapProps = {
  id: string;
  type: string;
  state: number;
  orders: Order[];
  xSize: number;
  ySize: number;
  coord: Coord;
  plannedPath: Coord[];
  handleClick: () => void;
};

function VehicleMap({
  id,
  type,
  state,
  orders,
  xSize,
  ySize,
  coord,
  plannedPath,
  handleClick,
}: VehicleMapProps) {
  const getColor = (state: number, type: string): string => {
    let color = "black";
    switch (state) {
      case 1:
        color = "#F6BA32";
        break;
      case 2:
        color = type === "Auto" ? "#09A2B0" : "#6870FA";
        break;
      case 3:
        color = "#E74C3C";
        break;
      default:
        break;
    }
    return color;
  };

  const x =
    (xSize * coord.x < xSize * mapConfig.xkm - 44
      ? xSize * coord.x
      : xSize * mapConfig.xkm - 44) - 12;
  const y = ySize * coord.y - 9.5;

  return (
    <div
      onClick={handleClick}
      className="VehicleMap"
      style={{
        background: getColor(state, type),
        left: `${x}px`,
        bottom: `${y}px`,
        display:
          coord.x === mapConfig.xAlm && coord.y === mapConfig.yAlm
            ? "none"
            : "flex",
      }}
    >
      <div className="VehicleMap_item" style={{ color: getColor(state, type) }}>
        <span className="VehicleMap_item_text">{id}</span>
        <i
          className={`VehicleMap_item_i bi bi-${
            type === "Auto" ? "car-front-fill" : "bicycle"
          }`}
        ></i>
      </div>
    </div>
  );
}

export default Map;
