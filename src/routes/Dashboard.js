import React, {useEffect, useState} from "react";
import FilterBar from "../components/FilterBar";

import Page from "../components/Page";
import RevenueChart from "../components/RevenueChart";
import styles from "../components/Dashboard.module.scss";
import cx from "classnames";
import CustomWidget from "../components/CustomWidget";


const Dashboard = () => {
    const [title, setTitle] = useState('');
    const [appliedDateFilter, setAppliedDateFiter] = useState({
        selectedFilterOption: null,
        excludeCurrentPeriod: false,
        });
    const generateTitle = (filter) => {
      if (!filter) {
        return '';
      }
      
      if (filter.selectedFilterOption.from &&
      (typeof filter.selectedFilterOption.from === 'string' || filter.selectedFilterOption.from instanceof String)) {
        return `${filter.selectedFilterOption.from} - ${filter.selectedFilterOption.to}`;
      }
      return filter.selectedFilterOption.localIdentifier;
    }
        
    const onApplyFilters = (filter) => {
        setAppliedDateFiter({
          selectedFilterOption: filter.selectedFilterOption,
          excludeCurrentPeriod:filter.excludeCurrentPeriod
        });
    };
    
    useEffect(() => {
      if (appliedDateFilter.selectedFilterOption) {
        setTitle(generateTitle(appliedDateFilter));
      }
    },[appliedDateFilter]);
    
    return <Page> 
        <div className={cx(styles.Title)}>
            {`My Dashboard ${title}`}
        </div>
        <div className={cx(styles.FilterBar)}>
            <FilterBar 
                onApply={onApplyFilters}
            />
        </div>
        <div className={cx(styles.Body)}>
            <div className={cx(styles.Chart)}>
                {appliedDateFilter.selectedFilterOption && (
                <RevenueChart filter={appliedDateFilter}/>
                )}
            </div>
            <div className={cx(styles.Custom)}>
                {appliedDateFilter.selectedFilterOption && (
                <CustomWidget filter={appliedDateFilter}/>
                )}
            </div>
        </div>
    </Page>;
};

export default Dashboard;