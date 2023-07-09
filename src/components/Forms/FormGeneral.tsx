import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { tokens } from "../../layouts/Theme";
import { Box, Typography, useTheme, Paper } from "@mui/material";
import "./FormGeneral.css";
import FormPedidos from "./FormPedidos";
import FormAverias from "./FormAverias";
import { Data } from "../../utils/types";
import MasiveOrderForm from "./MasiveOrderForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  data: Data;
};

export default function FormGeneral({ data }: Props) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        width: "200px",
        height: "fit-content",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Autos" {...a11yProps(0)} />
          <Tab label="Averias" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{}}>
        <TabPanel value={value} index={0}>
          <FormPedidos />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormAverias data={data} />
        </TabPanel>
      </Box>
    </Paper>
  );
}
