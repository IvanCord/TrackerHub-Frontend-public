import Map from "../components/Map/Map";
import BasicLayout from "../layouts/BasicLayout";
import { useState, useEffect, useContext } from "react";
import { Data, GeneralConfig } from "../utils/types";
import { autos, motos, blockers } from "../utils/dataDummy";
import { styled } from "@mui/material/styles";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../layouts/Theme";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Config from "../components/NewLayout/Config/Config";
import Timers from "../components/NewLayout/Timers/Timers";
import Detail from "../components/Detail/Detail";
import Orders from "./Orders";

const strDateToday = new Date().toDateString();

const initConfig: GeneralConfig = {
  simulationType: 1,
  tunerTime: 0,
  started: false,
  date: new Date(strDateToday), //hoy
  // simulSeconds: 0
};

const initData: Data = { autos, motos, blockers };

function Simulator() {
  const [generalConfig, setGeneralConfig] = useState(initConfig);
  const [simulSeconds, setSimulSeconds] = useState(0);
  const [data, setData] = useState(initData);

  return (
    <BasicLayout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          spacing={1}
          sx={{
            display: "flex",
          }}
        >
          <Grid
            xs={10}
            sx={{
              p: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Map generalConfig={generalConfig} data={data} />
          </Grid>
          <Grid xs={2}>
            <Stack
              direction={"row"}
              spacing={3}
              sx={{
                width: "100%",
                display: "flex",
                padding: "15px",
              }}
            >
              <Config
                generalConfig={generalConfig}
                setGeneralConfig={setGeneralConfig}
                data={data}
                setData={setData}
                simulSeconds={simulSeconds}
                setSimulSeconds={setSimulSeconds}
              />
              {generalConfig.simulationType === 2 ||
              generalConfig.simulationType === 3 ? (
                <Timers
                  generalConfig={generalConfig}
                  simulSeconds={simulSeconds}
                />
              ) : (
                <></>
              )}

              <Detail data={data} />
            </Stack>
            <Orders />
          </Grid>
        </Grid>
      </Box>
    </BasicLayout>
  );
}

export default Simulator;
