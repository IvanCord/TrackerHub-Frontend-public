import { vehiclesDetails } from "./dataConfig"
import { generateRandomNumber } from "./fnGenerics"
import { Blocker, Vehicle } from "./types"


//TO DO: vaciar
export const blockers: Blocker[] = []

export const autos: Map<string, Vehicle> = new Map();
export const motos: Map<string, Vehicle> = new Map();

/* ANTERIOR */
// export const autos: Vehicle[] = []
// export const motos: Vehicle[] = []

// for (let i = 0; i < vehiclesDetails.autos.total + vehiclesDetails.motos.total; i++) {
//     const type = i<vehiclesDetails.autos.total? "Auto": "Moto"
//     const element: Vehicle = {
//         id: type === "Auto"? i: i-vehiclesDetails.autos.total,
//         type: type,
//         state: generateRandomNumber(1,2),
//         initIncident: new Date(2023, 3, 26),
//         finIncident: new Date(2023, 3, 27),
//         orders: [

//         ],
//         coord: {
//             x: 0,
//             y: 0
//         }
//     }
//     if(type === "Auto") autos.set(i.toString(), element)
//     else motos.push(element)
// }

// //TO DO: QUITAR! solo por efectos de prueba
// for(let i = 0; i < vehiclesDetails.autos.total; i++) {
//     const auto = autos[i]
//     if(auto.state===1) {
//         auto.orders.push({
//             id: i*10+1,
//             state: 3,
//             packets: 8,
//             coord: {x:45, y:50},
//             registered: new Date(2023, 3, 26),
//             mmTime: 3*60 + 50,
//             hLimit: 8
//         })
//         auto.orders.push({
//             id: i*10+2,
//             state: 2,
//             packets: 5,
//             coord: {x:60, y:12},
//             registered: new Date(2023, 3, 26),
//             mmTime: 6*60 + 10,
//             hLimit: 8
//         })
//         auto.orders.push({
//             id: i*10+3,
//             state: 2,
//             packets: 3,
//             coord: {x:45, y:30},
//             registered: new Date(2023, 3, 26),
//             mmTime: 15*60 + 34,
//             hLimit: 8
//         })
//     }
// }

// export const orders = []
// TO DO: va a depender mucho de si las órdenes se pueden fragmentar


/* EJEMPLO */
// const data = {
//     orders: {
//         delivered: 10, //autos y motos en general
//         onTheWay: 12,
//         pending: 1
//     },
//     blockers: [
//         {
//             id: 0,
//             init: new Date(2023, 3, 26),
//             fin: new Date(2023, 3, 27),
//             coords: [
//                 {
//                     x: 50,
//                     y: 60
//                 },
//                 {
//                     x: 50,
//                     y: 70
//                 },
//                 {
//                     x: 40,
//                     y: 70
//                 },
//                 {
//                     x: 40,
//                     y: 30
//                 },
//             ]
//         },
//         {
//             id: 1,
//             init: new Date(2023, 3, 26),
//             fin: new Date(2023, 3, 27),
//             coords: [
//                 {
//                     x: 50,
//                     y: 60
//                 },
//                 {
//                     x: 50,
//                     y: 70
//                 },
//                 {
//                     x: 40,
//                     y: 70
//                 },
//                 {
//                     x: 40,
//                     y: 30
//                 },
//             ]
//         },
//     ],
//     autos: [
//         {
//             id: 0,
//             type: "Auto",
//             state: 3, // 1 activo (en espera o circulando), 2 incidente temporal, 3 indidente permanente
//             initIncident: undefined, // solo si es incidente temporal
//             finIncident: undefined, // solo si es incidente temporal
//             orders: [
//                 {
//                     id: 123,
//                     state: 3, //1 pendiente de repartición (no se coloca), 2 en camino, 3 entregado
//                     packets: 8,
//                     coord: {x:45, y:50},
//                     registered: new Date(2023, 3, 26),
//                     mmTime: 3*60 + 50, // minutos desde el registro hasta su entrega estimada !!! cambiar por fechaDeEntrega?
//                     hLimit: 8 // según tipo de entrega 4,6,8,24
//                 }
                
//             ],
//             coord: {
//                 x: 12,
//                 y: 12
//             }
//         },
//         {
//             id: 1,
//             type: "Auto",
//             state: 2, // 1 activo (en espera o circulando), 2 incidente temporal, 3 indidente permanente
//             initIncident: new Date(2023, 3, 26), // solo si es incidente temporal
//             finIncident: new Date(2023, 3, 27), // solo si es incidente temporal
//             orders: [
//                 // estado 1 y sin ordenes es porque esta En espera
//                 // estado 2 y 3, no esta Activo, entonces no tiene ordenes
//             ],
//             coord: {
//                 x: 12,
//                 y: 12
//             }
//         }
//     ],
//     motos: [
//         //igual que los autos
//     ]
// }
