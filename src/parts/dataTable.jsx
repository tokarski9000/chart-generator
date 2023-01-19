function DataTable (props) {
  // Finding longest array of arrays
  const findLongestArrayOfArray = (array) => {
    let longest = 0
    array.forEach(element => { return element.length > longest ? longest = element.length : longest })
    return longest
  }

  // Creating new array to display data as table
  const maxArrayLength = findLongestArrayOfArray(props.chartData.map(obj => obj.data))
  const tableRow = []
  for (let k = 0; k < maxArrayLength; k++) {
    const row = []
    for (let i = 0; i < props.chartData.length; i++) {
      const cells = []
      if (props.chartData[i].data[k]) {
        cells.push(props.chartData[i].data[k])
      }
      row.push(cells)
    }
    tableRow.push(row)
  }

  return (
		<article>
			<h4>Datasets</h4>
			<table>
				<thead>
                    <tr>
                        { props.chartData.map((set, i) => {
                          return <th key={'th' + i}>{set.dataSetName}</th>
                        })}
                    </tr>

				</thead>
				<tbody>
                    {/*
                        Iterate through the array to build table rows and cells.
                    */}
                    {tableRow.map((rows, i) => {
                      return (<tr key={'tr' + i}>
                        {rows.map((td, j) => {
                          return <td key={'td' + j}>{td}</td>
                        })}
                        </tr>)
                    })}
				</tbody>
			</table>
		</article>
  )
}

export default DataTable
