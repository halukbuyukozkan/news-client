import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Chart from "react-apexcharts";
import axios from "axios";
import { parseInt } from "lodash";
import WeekChart from "./WeekChart";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

function calcPercentage(main, summary) {
  return (main * 100) / summary;
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function dataParseForWeek(data, dateKey) {
  let valuesForWeekdays = [0, 0, 0, 0, 0, 0, 0];

  data.forEach((element) => {
    let weekNumber = new Date(element[dateKey]).getDay();
    valuesForWeekdays[weekNumber] = valuesForWeekdays[weekNumber] + 1;
  });
  return valuesForWeekdays;
}

function ExamplePage(props) {
  const theme = useTheme();
  const { t } = useTranslation("examplePage");
  const [awaitRender, setAwaitRender] = useState(true);
  const [allData, setAllData] = useState({
    orders: [],
    products: [],
    approvedOrders: 0,
    unApprovedOrders: 0,
  });

  return (
    <Root
      header={
        <div className="p-24">
          <h4>Dashboard</h4>
        </div>
      }
      content={
        <div className="p-24 w-full flex flex-col">
          <h3>test</h3>
        </div>
      }
      scroll="content"
    />
  );
}

export default ExamplePage;
