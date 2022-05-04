import './NivoLineChart.sass'
import {ResponsiveBar} from "@nivo/bar";

const MyResponsiveBar = props => {


    

    let nullData;

    function countNullData() {
        for(let i = 0; i < props.data.group_item_values.length; i ++) {
            console.log('detect', props.data.group_item_values[i] === 0)
            if(props.data.group_item_values[i] === 0) {
                return nullData = false
            } else {
                return nullData = true
            }
        }
    }

    countNullData();
    

    const result = []

    const tempArr = [
        {
            "date": "1 day",
            "Detected copies": '23',
            "Reported": '10',
            "Removed": '15'
        },
        {
            "date": "2 day",
            "Detected copies": '43',
            "Reported": '23',
            "Removed": '23'
        },
        {
            "date": "3 day",
            "Detected copies": '45',
            "Reported": '43',
            "Removed": '12'
        },
        {
            "date": "4 day",
            "Detected copies": '43',
            "Reported": '12',
            "Removed": '67'
        },
        {
            "date": "5 day",
            "Detected copies": '0',
            "Reported": '0',
            "Removed": '0'
        },
        {
            "date": "6 day",
            "Detected copies": '12',
            "Reported": '43',
            "Removed": '23'
        },
        {
            "date": "7 day",
            "Detected copies": '54',
            "Reported": '34',
            "Removed": '38'
        },
        {
            "date": "8 day",
            "Detected copies": '54',
            "Reported": '23',
            "Removed": '15'
        },
        {
            "date": "9 day",
            "Detected copies": '53',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "10 day",
            "Detected copies": '12',
            "Reported": '32',
            "Removed": '23'
        },
        {
            "date": "11 day",
            "Detected copies": '34',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "12 day",
            "Detected copies": '23',
            "Reported": '43',
            "Removed": '23'
        },





        {
            "date": "13 day",
            "Detected copies": '23',
            "Reported": '10',
            "Removed": '15'
        },
        {
            "date": "14 day",
            "Detected copies": '43',
            "Reported": '23',
            "Removed": '23'
        },
        {
            "date": "15 day",
            "Detected copies": '45',
            "Reported": '43',
            "Removed": '12'
        },
        {
            "date": "16 day",
            "Detected copies": '43',
            "Reported": '12',
            "Removed": '67'
        },
        {
            "date": "17 day",
            "Detected copies": '0',
            "Reported": '0',
            "Removed": '0'
        },
        {
            "date": "18 day",
            "Detected copies": '12',
            "Reported": '43',
            "Removed": '23'
        },
        {
            "date": "19 day",
            "Detected copies": '54',
            "Reported": '34',
            "Removed": '38'
        },
        {
            "date": "20 day",
            "Detected copies": '54',
            "Reported": '23',
            "Removed": '15'
        },
        {
            "date": "21 day",
            "Detected copies": '53',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "22 day",
            "Detected copies": '12',
            "Reported": '32',
            "Removed": '23'
        },
        {
            "date": "23 day",
            "Detected copies": '34',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "24 day",
            "Detected copies": '23',
            "Reported": '43',
            "Removed": '23'
        },
        {
            "date": "25 day",
            "Detected copies": '23',
            "Reported": '10',
            "Removed": '15'
        },
        {
            "date": "26 day",
            "Detected copies": '43',
            "Reported": '23',
            "Removed": '23'
        },
        {
            "date": "27 day",
            "Detected copies": '45',
            "Reported": '43',
            "Removed": '12'
        },
        {
            "date": "28 day",
            "Detected copies": '43',
            "Reported": '12',
            "Removed": '67'
        },
        {
            "date": "29 day",
            "Detected copies": '0',
            "Reported": '0',
            "Removed": '0'
        },
        {
            "date": "30 day",
            "Detected copies": '12',
            "Reported": '43',
            "Removed": '23'
        },
        {
            "date": "31 day",
            "Detected copies": '54',
            "Reported": '34',
            "Removed": '38'
        },
        {
            "date": "32 day",
            "Detected copies": '54',
            "Reported": '23',
            "Removed": '15'
        },
        {
            "date": "33 day",
            "Detected copies": '53',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "34 day",
            "Detected copies": '12',
            "Reported": '32',
            "Removed": '23'
        },
        {
            "date": "35 day",
            "Detected copies": '34',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "36 day",
            "Detected copies": '23',
            "Reported": '43',
            "Removed": '23'
        },





        {
            "date": "37 day",
            "Detected copies": '23',
            "Reported": '10',
            "Removed": '15'
        },
        {
            "date": "38 day",
            "Detected copies": '43',
            "Reported": '23',
            "Removed": '23'
        },
        {
            "date": "39 day",
            "Detected copies": '45',
            "Reported": '43',
            "Removed": '12'
        },
        {
            "date": "40 day",
            "Detected copies": '43',
            "Reported": '12',
            "Removed": '67'
        },
        {
            "date": "41 day",
            "Detected copies": '0',
            "Reported": '0',
            "Removed": '0'
        },
        {
            "date": "42 day",
            "Detected copies": '12',
            "Reported": '43',
            "Removed": '23'
        },
        {
            "date": "43 day",
            "Detected copies": '54',
            "Reported": '34',
            "Removed": '38'
        },
        {
            "date": "44 day",
            "Detected copies": '54',
            "Reported": '23',
            "Removed": '15'
        },
        {
            "date": "45 day",
            "Detected copies": '53',
            "Reported": '23',
            "Removed": '54'
        },
        {
            "date": "46 day",
            "Detected copies": '12',
            "Reported": '32',
            "Removed": '23'
        },
        {
            "date": "46 day",
            "Detected copies": '34',
            "Reported": '23',
            "Removed": '54'
        }
    ]

    const LabelNames = props.data.label_names
    const dateArray = props.data.dates
    const GroupItemValues = props.data.group_item_values

    for (let i = 0; i < dateArray.length; i++) {
        let temp = GroupItemValues.splice(0,3)
        result.push(
            Object.assign({"date" : dateArray[i]},
                Object.assign(...LabelNames.map((n, i) => (({[n]: temp[i]})))))
        )
    }


    const onClick = (event) => {
        console.log('clicked event.data.id', event.id)
    }


    const customColors = ['#8E6F03', '#900900', '#48519D'];

    return (
        <div 
            style={
                nullData
                ? null
                : {
                  minWidth: parseInt(tempArr.length + '00'),
                  opacity: "0.3"
                }
            }
            className="NivoLineChartContainer"
        >
            <div className="NivoLineChart">
                <ResponsiveBar
                    data={
                        nullData
                            ? result
                            : tempArr
                    }
                    keys={['Removed', 'Detected copies', 'Reported']}
                    indexBy="date"
                    margin={{top: 0, right: 0, bottom: 30, left: 30}}
                    padding={0.3}
                    innerPadding={2}
                    colors={customColors}
                    groupMode={'grouped'}
                    gridYValues={[0, 20, 40, 60, 80]} // need Y lines
                    onClick={(event) => onClick(event)}
                    colorBy="id"
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 10,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    enableLabel={false}
                    fill={[
                        {
                            match: {
                                id: 'fries'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'sandwich'
                            },
                            id: 'lines'
                        }
                    ]}
                    // borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    borderColor={"#003E3A"}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: null, // country
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 15,
                        tickRotation: 0,
                        legend: null, // food
                        legendPosition: 'middle',
                        legendOffset: 40,

                        tickValues: 4,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
                </div>
            {
                nullData
                    ? null
                    : <div className="bar_chart_noData">NO DATA</div>

            }
            </div>
    )
}

export default MyResponsiveBar;
