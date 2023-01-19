class LabelsX {
  constructor (
    rawLabels = '',
    labels = [],
    delimiter = '',
    repeater = true,
    regex = false
  ) {
    this.rawLabels = rawLabels
    this.labels = labels
    this.delimiter = delimiter
    this.repeater = repeater
    this.regex = regex
  }
}
export default LabelsX
