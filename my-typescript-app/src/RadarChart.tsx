// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/radar
import { ResponsiveRadar } from '@nivo/radar'

const data = [
    {
      "taste": "fruity",
      "chardonay": 26,
      "carmenere": 74,
      "syrah": 31
    },
    {
      "taste": "bitter",
      "chardonay": 84,
      "carmenere": 46,
      "syrah": 47
    },
    {
      "taste": "heavy",
      "chardonay": 83,
      "carmenere": 23,
      "syrah": 87
    },
    {
      "taste": "strong",
      "chardonay": 60,
      "carmenere": 101,
      "syrah": 31
    },
    {
      "taste": "sunny",
      "chardonay": 66,
      "carmenere": 84,
      "syrah": 54
    }
  ]
  

  export function RadarChart() {
    return (
        <div style={{ height: 420, maxWidth: "100%" }}>
          <ResponsiveRadar
            data={data}
            keys={[ 'chardonay', 'carmenere', 'syrah' ]}
            indexBy="taste"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
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
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
          />
        </div>
      );
  }