import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Merge } from 'type-fest';
import { createChart, ChartOptions, DeepPartial } from 'lightweight-charts';
import ChartContext, { ChartObject } from './ChartContext';

export type ChartProps = Merge<
  DeepPartial<ChartOptions>,
  {
    id?: string;
    children?: Iterable<React.ReactNode>;
  }
>;

function Chart(props: ChartProps) {
  const { id, children, ...chartOptions } = props;

  const chartWrapperRef = useRef<HTMLDivElement>(null);

  const chartElement: HTMLDivElement = useMemo(() => document.createElement('div'), []);

  const chart: ChartObject = useMemo(() => {
    if (chartElement.firstChild) chartElement.removeChild(chartElement.firstChild);

    return createChart(chartElement, chartOptions);
  }, [chartElement, chartOptions]);

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
