import Map from "../components/Map/Map";
import BasicLayout from "../layouts/BasicLayout";
import { useState, useEffect, useContext } from "react";
import { Data, GeneralConfig } from "../utils/types";
import { autos, motos, blockers } from "../utils/dataDummy";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Config from "../components/NewLayout/Config/Config";
import DetailTable from "../components/Tables/DetailTable";
import FormGeneral from "../components/Forms/FormGeneral";
import Timers from "../components/NewLayout/Timers/Timers";

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
      <Box sx={{ flexGrow: 1, position: "relative" }}>
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
          <Grid justifyContent={"center"} alignContent={"center"}>
            <Box
              sx={{
                maxHeight: "100%",
                maxWidth: "100%",
                display: "flex",
              }}
            >
              <Stack direction={"column"}>
                <Config
                  generalConfig={generalConfig}
                  setGeneralConfig={setGeneralConfig}
                  data={data}
                  setData={setData}
                  simulSeconds={simulSeconds}
                  setSimulSeconds={setSimulSeconds}
                />
              </Stack>
              <FormGeneral data={data} />
            </Box>
            <DetailTable data={data} />
          </Grid>
        </Grid>
        {generalConfig.simulationType === 2 ||
        generalConfig.simulationType === 3 ? (
          <Timers generalConfig={generalConfig} simulSeconds={simulSeconds} />
        ) : (
          <></>
        )}
      </Box>
    </BasicLayout>
  );
}

export default Simulator;
