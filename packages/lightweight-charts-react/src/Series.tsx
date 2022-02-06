import React, { createContext, memo, useContext, useEffect, useMemo } from 'react';
import { Simplify } from 'type-fest';
import {
  SeriesType,
  ISeriesApi,
  CandlestickSeriesPartialOptions,
  AreaSeriesPartialOptions,
  BarSeriesPartialOptions,
  BaselineSeriesPartialOptions,
  HistogramSeriesPartialOptions,
  LineSeriesPartialOptions,
  SeriesPartialOptions,
  SeriesDataItemTypeMap,
} from 'lightweight-charts';
import { useChart } from './Chart';

export type SeriesObject<T extends SeriesType> = Simplify<ISeriesApi<T>>;

export type SeriesData<T extends SeriesType> = SeriesDataItemTypeMap[T];

const SeriesContext = createContext<SeriesObject<SeriesType> | null>(null);

export function useSeries<T extends SeriesType>(): SeriesObject<T> {
  const seriesObject = useContext(SeriesContext);

  if (!seriesObject) throw new Error('useSeries should be used within the Chart element');

  return seriesObject as SeriesObject<T>;
}

export type SeriesOptions<T extends SeriesType> = T extends 'Candlestick'
  ? CandlestickSeriesPartialOptions
  : T extends 'Area'
  ? AreaSeriesPartialOptions
  : T extends 'Baseline'
  ? BaselineSeriesPartialOptions
  : T extends 'Bar'
  ? BarSeriesPartialOptions
  : T extends 'Histogram'
  ? HistogramSeriesPartialOptions
  : T extends 'Line'
  ? LineSeriesPartialOptions
  : SeriesPartialOptions<SeriesType>;

export type SeriesProps<T extends SeriesType> = {
  type: T;
  options?: SeriesOptions<T>;
  children?: React.ReactNode | React.ReactNode[] | null;
  data?: SeriesData<T>[];
};

function Series<T extends SeriesType>(props: SeriesProps<T>) {
  const chart = useChart();

  const series = useMemo(() => {
    switch (props.type) {
      case 'Area':
        return chart.addAreaSeries(props.options);
      case 'Bar':
        return chart.addBarSeries(props.options);
      case 'Baseline':
        return chart.addBaselineSeries(props.options);
      case 'Candlestick':
        return chart.addCandlestickSeries(props.options);
      case 'Histogram':
        return chart.addHistogramSeries(props.options);
      case 'Line':
        return chart.addLineSeries(props.options);
      default:
        throw new Error(`Unknown series type '${props.type}'`);
    }
  }, [props.type, chart]);

  useEffect(() => {
    if (props.data) series.setData(props.data);
  }, [props.data, series]);

  return <SeriesContext.Provider value={series}>{props.children}</SeriesContext.Provider>;
}

export default memo(Series);
