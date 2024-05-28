import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import FieldKey from './FieldKey';
import '../css/radarChart.css';

interface RadarChartProps {
  data: any[];
  keys: string[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, keys }) => {
  console.log('RadarChart data:', data);
  console.log('RadarChart keys:', keys);

  return (
      <div className="radar-chart-container">
        <div className="chart-wrapper">
          <ResponsiveRadar
              data={data}
              keys={keys}
              indexBy="field"
              valueFormat=">-.2f"
              margin={{ top: 90, right: 90, bottom: 70, left: 90 }}
              borderColor={{ from: 'color' }}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              colors={['#4899f0', '#F47560', '#F1E15B']}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: '#777777',
                      strokeWidth: 1,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: '#777777',
                      strokeWidth: 1,
                    },
                    text: {
                      fontSize: 20,
                      fontWeight: 'bold',
                      fill: '#333333',
                    },
                  },
                  legend: {
                    text: {
                      fontSize: 16,
                      fontWeight: 'bold',
                      fill: '#333333',
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: '#dddddd',
                    strokeWidth: 1,
                  },
                },
                legends: {
                  text: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#333333',
                  },
                },
                labels: {
                  text: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#333333',
                  },
                },
                dots: {
                  text: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#333333',
                  },
                },
              }}
          />
        </div>
        <FieldKey /> {/* Add FieldKey component */}
      </div>
  );
};
