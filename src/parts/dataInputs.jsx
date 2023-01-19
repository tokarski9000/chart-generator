import { useRef } from "react";

function DataInputs(props) {
	const textarea = useRef(null);

	const chartTypes = [
		{ name: "Line", type: "line" },
		{ name: "Bar", type: "bar" },
		{ name: "Pie", type: "pie" },
		{ name: "Radar", type: "radar" },
		{ name: "Polar Area", type: "polarArea" },
	];

	const toolTips = {
		regex: "No need for / /",
		rawData: "Only numeric and separatos",
		delimiter: "Character separating data",
		repeater: "Auto repeat pattern"
	};
	return (
		<>
			{/* 
			
				Min-max value for Y-axis
			
			*/}
			<div>
				<article>
					<details>
						<summary>Axis Y settings</summary>
						<div className="grid">
							<label htmlFor="minY">
								Min Y value
								<input
									id="y-min"
									name="minY"
									type="number"
									placeholder="Min Y value"
									value={props.settings[0].minY}
									onChange={props.handleChangeSettings}
								/>
							</label>
							<label htmlFor="maxY">
								Max Y value
								<input
									id="y-max"
									name="maxY"
									type="number"
									placeholder="Max Y value"
									value={props.settings[0].maxY}
									onChange={props.handleChangeSettings}
								/>
							</label>
						</div>
						<div className="grid">
							<label htmlFor="autoCalculateMin">
								<input
									type="checkbox"
									id="autoCalculateMin"
									name="autoCalculateMin"
									role="switch"
									onChange={props.handleChangeSettings}
									checked={props.settings[0].autoCalculateMin}
								/>
								Auto calculate Min Y
							</label>
							<label htmlFor="autoCalculateMax">
								<input
									type="checkbox"
									id="switchMax"
									name="autoCalculateMax"
									role="switch"
									onChange={props.handleChangeSettings}
									checked={props.settings[0].autoCalculateMax}
								/>
								Auto calculate Max Y
							</label>
						</div>
					</details>
				</article>

				<article>
					<details>
						<summary>Axis X settings</summary>
						<div>
							{/* 
							Set custom names for X axis instead of numbers
						
						*/}
							<div>
								<label htmlFor="rawLabels">
									Names for X-axis
									<input
										type="text"
										placeholder="Leave empty to auto-generate"
										name="rawLabels"
										id="rawLabels"
										onChange={props.handleLabelsXChange}
									/>
								</label>
							</div>
							<div className="grid">
								<div>
									<label htmlFor="repeater" 									data-tooltip={toolTips.repeater}
									data-placement="left">
										<input
											id="repeater"
											name="repeater"
											type="checkbox"
											role="switch"
											value={props.xLabels[0].repeater}
											onChange={props.handleLabelsXChange}
											defaultChecked
										/>
										Repeat?
									</label>
									<label
										htmlFor="regex"
										data-tooltip={toolTips.regex}
										data-placement="left"
									>
										<input
											type="checkbox"
											name="regex"
											role="switch"
											onChange={props.handleLabelsXChange}
										/>
										Regex
									</label>
								</div>

								<label
									htmlFor="delimiter"
									data-tooltip={toolTips.delimiter}
									data-placement="left"
								>
									Delimiter
									<textarea
										name="delimiter"
										id="delimiter"
										onChange={props.handleLabelsXChange}
									/>
								</label>
							</div>
						</div>
					</details>
				</article>

				{/* 

					Inputs for data for the chart	

				*/}
				{props.chartData.map((chartData, index) => (
					<li key={index}>
						<article>
							<label htmlFor="dataSetName">
								Data name
								<input
									name="dataSetName"
									type="text"
									placeholder="Label for X"
									onChange={(e) =>
										props.handleChangeDataSetProperty(
											e,
											index
										)
									}
									value={chartData.dataSetName}
								/>
							</label>
							<label
								htmlFor="rawData"
								data-tooltip={toolTips.rawData}
								data-placement="left"
							>
								Data for X - Axis
								<textarea
									name="rawData"
									cols="20"
									rows="9"
									placeholder="Data for chart"
									value={chartData.rawData}
									onChange={(e) =>
										props.handleDataXChange(
											e.target.value,
											index
										)
									}
								></textarea>
							</label>
							<label
								htmlFor="delimiter"
								data-tooltip={toolTips.delimiter}
								data-placement="left"
							>
								Delimiter
								<textarea
									type="text"
									cols="1"
									rows="1"
									name="delimiter"
									ref={textarea}
									data-key={index}
									value={chartData.delimiter}
									onChange={(e) => {
										props.handleChangeDataSetProperty(
											e,
											index
										);
										props.handleDataXChange(
											chartData.rawData,
											index,
											e.target.value
										);
									}}
								/>
								<label
									htmlFor="regex"
									data-tooltip={toolTips.regex}
									data-placement="left"
								>
									<input
										type="checkbox"
										name="regex"
										onChange={(e) =>
											props.handleChangeDataSetProperty(
												e,
												index
											)
										}
									/>
									Regex
								</label>
								<br />
							</label>
							<button
								className="danger"
								onClick={() => {
									props.handleDeleteDataset(index);
								}}
							>
								Delete
							</button>
						</article>
					</li>
				))}

				{/* 
				
					Get more data

				*/}
				<button
					className="secondary"
					onClick={props.handleAddAnotherData}
				>
					+
				</button>
			</div>
			<br />
			<div className="grid">
				{chartTypes.map((chartType) => {
					return (
						<button
							name="chartType"
							key={chartType.type}
							onClick={props.handleChangeSettings}
							value={chartType.type}
							className={
								chartType.type === props.settings[0].chartType
									? "active"
									: ""
							}
						>
							{chartType.name}
						</button>
					);
				})}
			</div>
		</>
	);
}

export default DataInputs;
