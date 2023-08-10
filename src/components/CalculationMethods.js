
const ProductMinRevenue = (result) => {
    let min = {
        name: null,
        revenue: 0
    };
    
    if (!result) {
        return min;
    }
    const measureSeries = result?.data().series().toArray();
    if (!measureSeries) {
        return min;
    }
    let productHeaders = result.dataView.headerItems[1][0];
    for (let i = 0; i < measureSeries.length; i++) {
        let productRevenue = measureSeries[i].dataPoints().reduce((total, item) => {
            return total + (item.rawValue ? Number(item.rawValue) : 0);
         }, 0); 
        if (min.name == null || min.revenue >= productRevenue) {
            min.name = productHeaders[i].attributeHeaderItem.name;
            min.revenue = Number(productRevenue.toFixed(2));
        }
    }
    return min;
}

const ProductMaxRevenue = (result) => {
    let max = {
        name: null,
        revenue: 0
    };
    
    if (!result) {
        return max;
    }
    const measureSeries = result?.data().series().toArray();
    if (!measureSeries) {
        return max;
    }
    let productHeaders = result.dataView.headerItems[1][0];
    for (let i = 0; i < measureSeries.length; i++) {
        let productRevenue = measureSeries[i].dataPoints().reduce((total, item) => {
            return total + (item.rawValue ? Number(item.rawValue) : 0);
         }, 0); 
        
        if (max == null || max.revenue <= productRevenue) {
            max.name = productHeaders[i].attributeHeaderItem.name;
            max.revenue = Number(productRevenue.toFixed(2));
        }
    }
    
    return max;
}

const MinRevenue = (result) => {
    let min = {
        name: null,
        revenue: 0
    };
    
    if (!result) {
        return min;
    }
    const measureSeries = result?.data().series().toArray();
    if (!measureSeries) {
        return min;
    }
    let productHeaders = result.dataView.headerItems[1][0];
    for (let i = 0; i < measureSeries.length; i++) {
        let productMinRevenue = measureSeries[i].dataPoints().reduce((min, item) => {
            if (min === -1 && item.rawValue) {
                return Number(item.rawValue);
                
            }
            
            if (!item.rawValue) {
                return min;
            }
            return Math.min(min, Number(item.rawValue));
         }, -1);
        if (min.name == null || min.revenue >= productMinRevenue) {
            min.name = productHeaders[i].attributeHeaderItem.name;
            min.revenue = Number(productMinRevenue.toFixed(2));
        }
    }
    return min;
}

const MaxRevenue = (result) => {
    let max = {
        name: null,
        revenue: 0
    };
    
    if (!result) {
        return max;
    }
    const measureSeries = result?.data().series().toArray();
    if (!measureSeries) {
        return max;
    }
    let productHeaders = result.dataView.headerItems[1][0];
    for (let i = 0; i < measureSeries.length; i++) {
        let productMaxRevenue = measureSeries[i].dataPoints().reduce((max, item) => {
            
            return Math.max(max, (item.rawValue ? Number(item.rawValue) : 0));
         }, 0); 
        
        if (max == null || max.revenue <= productMaxRevenue) {
            max.name = productHeaders[i].attributeHeaderItem.name;
            max.revenue = Number(productMaxRevenue.toFixed(2));
        }
    }
    
    return max;
}




export const calculationMethods = [
    {
        method: 'Product has Minimal Revenue',
        func: (result) => ProductMinRevenue(result)
    },
    {
        method: 'Product has Maximum Revenue',
        func: (result) => ProductMaxRevenue(result)
    },
    {
        method: 'Maximum Revenue',
        func: (result) => MaxRevenue(result)
    },
    {
        method: 'Minimal Revenue',
        func: (result) => MinRevenue(result)
    },
];