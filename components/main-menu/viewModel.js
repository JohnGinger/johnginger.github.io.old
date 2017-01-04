const ko = require('knockout');

let state;
let currentReportId;
let showReports = () => {
    state('existingReports');
}

let newReport = () =>{
    currentReportId();
    state('report');
    console.log("Starting new report")
}

let editCategories = () => state('edit-categories')

module.exports = function(params) {
    state = params.state;
    currentReportId = params.currentReportId
    this.showReports = showReports
    this.newReport = newReport
    this.editCategories = editCategories
}