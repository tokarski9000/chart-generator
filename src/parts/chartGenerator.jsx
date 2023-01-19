import Chart from 'chart.js/auto'
import { useState, useEffect } from 'react'

function ChartGenerator (props) {
  // const [maxY, setMaxY] = useState();
  // const [minY, setMinY] = useState();
  useEffect(() => {
    const ctx = document.getElementById('tempChart')
    const dataSets = props.chartData.map((set, index) => {
      return set.data
        ? { label: set.dataSetName, data: set.data }
        : { label: set.dataSetName, data: [] }
    })

    let autoMinY
    let autoMaxY

    if (props.settings[0].autoCalculateMin) {
      autoMinY = Math.min(
        ...props.chartData
          .map((x) => x.data)
          .flat()
          .filter((val) => !isNaN(val))
      )
    }
    if (props.settings[0].autoCalculateMax) {
      autoMaxY = Math.max(
        ...props.chartData
          .map((x) => x.data)
          .flat()
          .filter((val) => !isNaN(val))
      )
    }
    // Auto calculate labels for X - axis
    const arrayLengths = props.chartData.map((array) =>
      array.data ? array.data.length : 0
    )
    const longestArrayIndex = arrayLengths.indexOf(
      Math.max(...arrayLengths)
    )
    const longestArray = props.chartData[longestArrayIndex]
      ? props.chartData[longestArrayIndex].data
      : 0

    // X-axis labels logic.
    const labelsForX =
			props.xLabels[0].rawLabels !== ''
			  ? props.xLabels[0].rawLabels.split(props.xLabels[0].delimiter)
			  : longestArray && longestArray.map((value, index) => index)

    if (props.xLabels[0].repeater && props.xLabels[0].rawLabels !== '') {
      let i = 0
      while (labelsForX.length < longestArray.length) {
        labelsForX.push(labelsForX[i])
        i++
      }
    }
    const tempChart = new Chart(ctx, {
      type: props.settings[0].chartType,

      data: {
        labels: labelsForX,
        datasets: dataSets
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            max: props.settings[0].autoCalculateMax ? autoMaxY : props.settings[0].maxY,
            min: props.settings[0].autoCalculateMin ? autoMinY : props.settings[0].minY
          }
        },
        maintainAspectRatio: true,

        animations: {
          duration: 0
        }
      }
    })

    return () => {
      tempChart.destroy()
    }
  }, [
    props.chartData,
    props.settings,
    props.minY,
    props.maxY,
    props.chartType,
    props.autoCalculateMax,
    props.autoCalculateMin,
    props.xLabels
  ])
  return (
		<>
			<canvas id="tempChart"></canvas>
		</>
  )
}
export default ChartGenerator
