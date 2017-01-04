const ko = require('knockout');
const localforage = require('localforage');

let state;
const addPicture = function () {
    document.querySelector("#image").click();
}

const showPicture = function () {
    const imageUrl = getImageSrc(new Blob([document.querySelector('#image').files[0]]));
    document.querySelector(".add-picture .image-area").src = imageUrl;
}

var getImageSrc = function (blob) {
    return window.URL.createObjectURL(blob);
}

const saveReport = (report) => {
    const newReport = ko.toJSON(report)
    localforage.getItem('reports').then(function (res) {
        if (!res) {
            res = [];
        }
        let reports = res;
        res.push(JSON.parse(newReport));
        localforage.setItem('reports', reports).then(() => {
            state('existingReports');
        });
    })
}

const closeWithoutSaving = () => {
    if (confirm("Are you sure you want to close the report without saving")) {
        state('home');
    }
}

module.exports = function (params) {
    state = params.state;

    let number = ko.observable();;
    this.number = number
    localforage.getItem('reports').then((res) => {
        number(res.length + 1);
    })

    let categories = ko.observableArray([])
    this.categories = categories
    localforage.getItem('categories').then((res) => {
        if (res) {
            categories(res)
        }
    })

    this.issue = ko.observable();
    this.location = ko.observable();
    this.category = ko.observable();
    this.observations = ko.observable();
    this.actionRequired = ko.observable();
    this.allocatedTo = ko.observable();
    this.complete = ko.observable();


    this.addPicture = addPicture;
    this.showPicture = showPicture;
    this.saveReport = () => saveReport(this);
    this.closeWithoutSaving = closeWithoutSaving;
}