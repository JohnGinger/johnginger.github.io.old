const ko = require('knockout');
const localforage = require('localforage');

let state;
module.exports = function (params) {
    state = params.state
    this.newCategory = ko.observable()
    let categories = ko.observableArray([]);

    localforage.getItem('categories').then((res) => {
        if (res){
            categories(res)
        }
    })

    this.categories = categories

    this.addCategory = function () {
        categories.push({
            name: this.newCategory(),
            id: this.newCategory().trim().replace(/[^A-Z0-9]/ig, "-")
        });
         localforage.setItem('categories', categories())
    };

    this.removeCategory = function () {
        categories.remove(this);
        localforage.setItem('categories', categories())
    }
}