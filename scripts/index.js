/* if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    }).then(function (reg) {

        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }

    }).catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
} */
const localforage = require('localforage');
const ko = require('knockout');
const reports = ko.observableArray([]);
let state = ko.observable('home');

let saveReport = function () {
    localforage.getItem('reports').then(function (res) {
        if (!res) {
            res = [];
        }   
        let reports = res;
        res.push({
            title: "New name"
        });
        localforage.setItem('reports', reports).then(() => {
            state('existingReports');
        });
    })
}

let showReports = () => {
    state('existingReports');
    localforage.getItem('reports').then((res) => {
        reports(res)
    })
}

let loadReport = () => {
    state('report');
}

ko.applyBindings({
    state,
    reports,
    saveReport,
    loadReport,
    showReports
});

function addPicture() {
    document.querySelector("        #image").click();
}

function showPicture() {
    const imageUrl = getImageSrc(new Blob([document.querySelector('#image').files[0]]));
    document.querySelector(".add-picture .image-area").src = imageUrl;
}

var getImageSrc = function (blob) {
    return window.URL.createObjectURL(blob);
}