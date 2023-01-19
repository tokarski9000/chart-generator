class DataSet {
    constructor(rawData = '', data = [], delimiter = '', dataSetName = 'Data', regex = false ){
        this.rawData = rawData;
        this.data = data;
        this.delimiter = delimiter;
        this.dataSetName = dataSetName;
        this.regex = regex;
    }
}
export default DataSet;