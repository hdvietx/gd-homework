import React, { useEffect, useState } from "react";
import * as Md from "../md/full";
import { DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { useExecutionDataView } from "@gooddata/sdk-ui";
import styles from "../components/CustomWidget.module.scss";
import cx from "classnames";
import { calculationMethods } from "./CalculationMethods";


const CustomWidget = ({filter}) => {
    const dateFilter = [DateFilterHelpers.mapOptionToAfm(
        filter.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        filter.excludeCurrentPeriod,
    )];
    const [calMethod, setCalMethod] = useState(calculationMethods[0].method);
    const [calResult, setCalResult] = useState({
        name: null,
        revenue: 0
    });
    
    const seriesBy = [Md.Revenue, Md.Product.Default];
    const { result, status } = useExecutionDataView({ execution: { 
        seriesBy, 
        filters: dateFilter,
        slicesBy: Md.DateDatasets.Date.MonthYear.Long
        } });
        
    const onChange = (e) => {
        setCalMethod(e.target.value);
    }
    useEffect(() => {
        calculationMethods.forEach((item) => {
            if (item.method === calMethod) {
                let calR = item.func(result);
                setCalResult(calR);
            }
        })
    },[calMethod, result]);
    return (
       <div className={cx(styles.CustomWidget)}>
           <div className={cx(styles.Result)}>
               {status === 'success' && (<span>{calResult.name} : ${calResult.revenue}</span>)}
               {status === 'error' && (<span>N/A</span>)}
           </div>
           <div className={cx(styles.SelectMethod)}>
               <select onChange={onChange}>
                {calculationMethods.map(item => <option key={item.method} value={item.method}>{item.method}</option>)}
               </select>
           </div>
       </div>
    );
};
export default CustomWidget;
