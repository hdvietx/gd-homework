import React, {useEffect, useState} from "react";
import { DateFilter, defaultDateFilterOptions } from "@gooddata/sdk-ui-filters";
import "@gooddata/sdk-ui-filters/styles/css/main.css";

const FilterBar = ({onApply}) => {
    const [dateFilter, setDateFilter] = useState({
        selectedFilterOption: defaultDateFilterOptions.relativePreset["GDC.time.quarter"][0],
        excludeCurrentPeriod: false,
    });
    const onElementApply = (selectedFilterOption, excludeCurrentPeriod) => {
        setDateFilter({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };
    
    useEffect(() => {
        onApply(dateFilter);
    }, [dateFilter]);
       
    return (
        <div style={{width: 300}}>
            <DateFilter
                excludeCurrentPeriod={dateFilter.excludeCurrentPeriod}
                selectedFilterOption={dateFilter.selectedFilterOption}
                filterOptions={defaultDateFilterOptions}
                customFilterName="Date filter"
                dateFilterMode="active"
                dateFormat="M/d/yy"
                onApply={onElementApply}
            />
        </div>
    );
}

export default FilterBar;
