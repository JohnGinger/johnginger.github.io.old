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

let state = ko.observable('home');
let currentReportId = ko.observable();

ko.components.register('main-menu', {
    viewModel: require('../components/main-menu/viewModel'),
    template: require('fs').readFileSync(__dirname + '/../components/main-menu/template.html', 'utf8')
});

ko.components.register('edit-categories', {
    viewModel: require('../components/edit-categories/viewModel'),
    template: require('fs').readFileSync(__dirname + '/../components/edit-categories/template.html', 'utf8')
});

ko.components.register('existing-reports', {
    viewModel: require('../components/existing-reports/viewModel'),
    template: require('fs').readFileSync(__dirname + '/../components/existing-reports/template.html', 'utf8')
});

ko.components.register('report-details', {
    viewModel: require('../components/report-details/viewModel'),
    template: require('fs').readFileSync(__dirname + '/../components/report-details/template.html', 'utf8')
});

ko.applyBindings({
    state,
    currentReportId
});