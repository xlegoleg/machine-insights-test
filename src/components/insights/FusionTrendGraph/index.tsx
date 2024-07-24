import React from 'react';
import { useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';
import { selectInsights } from "../../../store/slices";
import { Insight } from "../../../api/insightsApi.ts";
import styles from './index.module.css';

const FusionTrendGraphComponent: React.FC = () => {
  const insights = useSelector(selectInsights);

  const getSeverityValue = (severity: string): number => {
    switch (severity) {
      case 'healthy':
        return 3;
      case 'alarm':
        return 2;
      case 'critical':
        return 1;
      default:
        return 0;
    }
  };

  const getColor = (severity: string): string => {
    switch (severity) {
      case 'healthy':
        return 'green';
      case 'alarm':
        return 'orange';
      case 'critical':
        return 'red';
      default:
        return 'gray';
    }
  };

  const groupByDate = (insights: Insight[]) => {
    const grouped = insights.reduce((acc, insight) => {
      const date = new Date(insight.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(insight);
      return acc;
    }, {} as Record<string, Insight[]>);

    return Object.keys(grouped).map(date => {
      const insightsForDate = grouped[date];
      const mostSevere = insightsForDate.reduce((acc, curr) => {
        return getSeverityValue(curr.severity) > getSeverityValue(acc.severity)
            ? curr
            : acc;
      });
      return {
        date,
        type: mostSevere.type,
        severity: mostSevere.severity,
      };
    });
  };

  const groupedData = groupByDate(insights);

  const option = {
    xAxis: {
      type: 'category',
      data: groupedData.map(insight => insight.date),
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 3,
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    series: [
      {
        data: groupedData.map(insight => ({
          value: getSeverityValue(insight.severity),
          name: insight.type,
          itemStyle: { color: getColor(insight.severity) },
        })),
        type: 'line',
        lineStyle: { color: 'gray' },
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  };

  return (
      <div className={styles.fusionTrendWrapper}>
        <ReactECharts
            option={option}
            className={styles.fusionTrend}
            style={{ height: '200px', width: '100%', background: 'white' }}
        />
      </div>
  )
};

export const FusionTrendGraph = React.memo(FusionTrendGraphComponent);
