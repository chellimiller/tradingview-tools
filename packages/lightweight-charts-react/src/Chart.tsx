import React, { createContext, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { Simplify } from 'type-fest';
import { createChart, ChartOptions as IChartOptions, DeepPartial, IChartApi } from 'lightweight-charts';

export type ChartObject = Simplify<IChartApi>;

const ChartContext = createContext<ChartObject | null>(null);

export const useChart = (): ChartObject => {
  const chartObject = useContext(ChartContext);

  if (!chartObject) throw new Error('useChart should be used within the Chart element');

  return chartObject;
};

export type ChartOptions = DeepPartial<IChartOptions>;

export type ChartProps = {
  id?: string;
  children?: React.ReactNode | React.ReactNode[] | null;
  options?: ChartOptions;
};

function Chart(props: ChartProps) {
  const { id, children, options } = props;

  const chartWrapperRef = useRef<HTMLDivElement>(null);

  const chartElement: HTMLDivElement = useMemo(() => document.createElement('div'), []);

  const chart: ChartObject = useMemo(() => {
    if (chartElement.firstChild) chartElement.removeChild(chartElement.firstChild);

    return createChart(chartElement, options);
  }, [chartElement, options]);

  useEffect(() => {
    if (chartWrapperRef && chartWrapperRef.current && !chartWrapperRef.current.hasChildNodes()) {
      chartWrapperRef.current.appendChild(chartElement);
    }
  }, [chartWrapperRef, chartElement]);

  return (
    <ChartContext.Provider value={chart}>
      <div className="lightweight-charts-react" id={id} ref={chartWrapperRef} />
      {children}
    </ChartContext.Provider>
  );
}

export default memo(Chart);
