class Settings {
  constructor (
    maxY = 10,
    minY = -10,
    chartType = 'line',
    autoCalculateMin = false,
    autoCalculateMax = true
  ) {
    this.maxY = parseFloat(maxY)
    this.minY = parseFloat(minY)
    this.chartType = chartType
    this.autoCalculateMin = autoCalculateMin
    this.autoCalculateMax = autoCalculateMax
  }

  updateObject (input, name) {
    if (name.match(/min|max/)) {
      this[name] = input !== '' ? parseFloat(input) : input
      return
    }
    this[name] = input
  }
}
export default Settings
