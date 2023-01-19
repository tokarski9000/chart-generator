import '@picocss/pico/css/pico.css'
import { useState } from 'react'
import chartSvg from './assets/chart.svg'
import './App.css'
import DataSet from './classes/class-DataSet'
import LabelsX from './classes/class-LabelsX'
import Settings from './classes/class-Settings'
import ChartGenerator from './parts/chartGenerator'
import DataInputs from './parts/dataInputs'
import DataTable from './parts/dataTable'
function App () {
  const [chartData, setChartData] = useState([new DataSet()])
  const [xLabels, setXLabels] = useState([new LabelsX()])
  const [settings, setSettings] = useState([new Settings()])

  // Setting main data for charts.
  const handleDataXChange = (
    inputData,
    index,
    newDelimiter = chartData[index].delimiter
  ) => {
    // Transofrming textarea value into array based on delimiter.
    if (chartData[index].regex && isValidRegex(newDelimiter)) {
      newDelimiter = new RegExp(newDelimiter)
    }
    const tempInput = inputData.split(newDelimiter)

    setChartData((prev) => {
      prev[index].data = tempInput.map((number) => parseFloat(number)) // Maping input transformened into array.
      prev[index].rawData = inputData // Setting plain text for textarea field.

      return [...prev]
    })
  }
  // Helper funciton to check if is valid regex
  const isValidRegex = (expression) => {
    let isValid = true
    try {
      new RegExp(expression)
    } catch (e) {
      isValid = false
    }
    return isValid
  }
  // Generic handler for other data ie. delimiter, dataSetName
  const handleChangeDataSetProperty = (e, index) => {
    setChartData((prev) => {
      if (e.target.type === 'checkbox') {
        prev[index][e.target.name] = e.target.checked
        return [...prev]
      }
      prev[index][e.target.name] = e.target.value
      return [...prev]
    })
    console.log(chartData)
  }

  // Adding another dataset window.
  const handleAddAnotherData = () => {
    setChartData((prev) => [
      ...prev,
      new DataSet(
        undefined,
        undefined,
        undefined,
		`Data ${chartData.length}`
      )
    ])
  }

  // Removing dataset.
  const handleDeleteDataset = (index) => {
    setChartData((prev) => prev.filter((_element, i) => i !== index))
  }

  const handleChangeSettings = (e) => {
    setSettings((prev) => {
      if (e.target.type === 'checkbox') {
        prev[0][e.target.name] = e.target.checked
        return [...prev]
      }
      prev[0].updateObject(e.target.value, e.target.name)
      return [...prev]
    })
  }

  // Handle adding custom labels for X-axis
  const handleLabelsXChange = (e) => {
    setXLabels((prev) => {
      if (e.target.type === 'checkbox') {
        prev[0][e.target.name] = e.target.checked
        return [...prev]
      }
      prev[0][e.target.name] = e.target.value
      return [...prev]
    })
    console.log(xLabels)
  }

  return (
		<>
			<h1>Chart Generator</h1>
			<a
				className="floating"
				href="#chart"
				data-tooltip="Show chart"
				data-placement="left"
			>
				<button className="gotochart">
					<img className="chartIcon" src={chartSvg} />
				</button>
			</a>
			<DataInputs
				// Core ChartData handles and props.
				chartData={chartData}
				handleDataXChange={handleDataXChange}
				handleChangeDataSetProperty={handleChangeDataSetProperty}
				handleAddAnotherData={handleAddAnotherData}
				handleDeleteDataset={handleDeleteDataset}
				// Handlers for Y-axis
				settings={settings}
				handleChangeSettings={handleChangeSettings}
				// Labels for X-axis
				xLabels={xLabels}
				handleLabelsXChange={handleLabelsXChange}
			/>
			<ChartGenerator
				chartData={chartData}
				settings={settings}
				xLabels={xLabels}
			/>
			<DataTable chartData={chartData} />
		</>
  )
}

export default App
