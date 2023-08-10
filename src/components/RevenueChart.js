import React from "react";
import * as Md from "../md/full";
import { LineChart } from "@gooddata/sdk-ui-charts";
import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
const RevenueChart = ({filter}) => {
    const dateFilter = [DateFilterHelpers.mapOptionToAfm(
        filter.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        filter.excludeCurrentPeriod,
    )];
    return (
           <LineChart
                measures={[ Md.Revenue]}
                trendBy={Md.DateDatasets.Date.MonthYear.Long}
                segmentBy={Md.Product.Default}
                filters={dateFilter}
        />
    );
};
export default RevenueChart;
