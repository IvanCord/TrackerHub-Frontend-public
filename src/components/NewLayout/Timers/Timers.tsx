import { formaterTime, getTunerValue } from "../../../utils/fnGenerics";
import { GeneralConfig } from "../../../utils/types";
import "./Timers.css";
import "../../deprecated/Navbar/Navbar.css";
import { Box, Chip, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../layouts/Theme";
import FaceIcon from "@mui/icons-material/Face";

type TimersProps = {
  generalConfig: GeneralConfig;
  simulSeconds: number;
};

function Timers({ generalConfig, simulSeconds }: TimersProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        alignItems: "center",
        top: "5%",
        left: "60%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        gap: "20px",
      }}
    >
      <TimerUpt
        type={1}
        generalConfig={generalConfig}
        simulSeconds={simulSeconds}
      />
      <TimerUpt
        type={0}
        generalConfig={generalConfig}
        simulSeconds={simulSeconds}
      />
    </Box>
  );
}

type TimerItem = {
  key: string;
  value: string;
};
type TimerProps = {
  type: number;
  generalConfig: GeneralConfig;
  simulSeconds: number;
};

const TimerUpt = ({ type, generalConfig, simulSeconds }: TimerProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getTimes = () => {
    const a: TimerItem = {
      key: type === 0 ? "hh" : "dd",
      value: formaterTime(
        type === 0
          ? Math.floor(simulSeconds / 3600)
          : Math.floor(
              (simulSeconds * getTunerValue(generalConfig.tunerTime)) /
                (3600 * 24)
            )
      ),
    };
    const b: TimerItem = {
      key: type === 0 ? "mm" : "hh",
      value: formaterTime(
        type === 0
          ? Math.floor(simulSeconds / 60) % 60
          : Math.floor(
              (simulSeconds * getTunerValue(generalConfig.tunerTime)) / 3600
            ) % 24
      ),
    };
    const c: TimerItem = {
      key: type === 0 ? "ss" : "mm",
      value: formaterTime(
        type === 0
          ? simulSeconds % 60
          : Math.floor(
              (simulSeconds * getTunerValue(generalConfig.tunerTime)) / 60
            ) % 60
      ),
    };
    return [a, b, c];
  };

  return (
    <Box
      sx={{
        backgroundColor:
          type === 1 ? colors.greenAccent[400] : colors.blueAccent[400],
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "20px",
        padding: "1px 6px",
        width: "150px",
      }}
    >
      <Typography
        fontSize="13px"
        fontWeight="600"
        sx={{ marginLeft: "14px", color: "whitesmoke" }}
      >
        {type === 0 ? "Real" : "Simu"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          marginX: "auto",
        }}
      >
        {getTimes().map((item, key) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={key}
          >
            <Typography
              fontSize={11}
              fontWeight={600}
              sx={{ height: "10px", color: "whitesmoke" }}
            >
              {item.key}
            </Typography>
            <Typography fontWeight={500} sx={{ color: "whitesmoke" }}>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Timers;
