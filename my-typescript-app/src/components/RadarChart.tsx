import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

interface RadarChartProps {
  data: any[];
  keys: string[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, keys }) => {
  console.log('RadarChart data:', data);
  console.log('RadarChart keys:', keys);

  return (
    <div style={{ height: 420, maxWidth: '100%' }}>
      <ResponsiveRadar
        data={data}
        keys={keys}
        indexBy="field"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={[' #4899f0', '#F47560', '#F1E15B']}
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
      />
    </div>
  );
};
