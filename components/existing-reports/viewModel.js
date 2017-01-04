const ko = require('knockout');
const localforage = require('localforage');

let state;
let currentReportId;

module.exports = function (params) {
    state = params.state
    currentReportId = params.currentReportId

    let reports = ko.observableArray([]);
    this.reports = reports;

    this.loadReport = function () {
        console.log('Loading Report')
        currentReportId(this.number)
        state('report')
    }

    localforage.getItem('reports').then((res) => {
        reports(res)
    })

    this.removeReport = function () {
        if (confirm("Are you sure you want to delete the report")) {
            reports.remove(this);
            localforage.setItem('reports', reports())
        }
    }
}