import { createContext, useContext } from 'react';

import { IChartApi } from 'lightweight-charts';

export type ChartObject = IChartApi;

const ChartContext = createContext<ChartObject | null>(null);

export const useChart = (): ChartObject => {
  const chartObject = useContext(ChartContext);

  if (!chartObject) throw new Error('useChart should be used within the Chart element');

  return chartObject;
};

export default ChartContext;
