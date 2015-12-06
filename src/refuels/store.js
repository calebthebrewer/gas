import Reflux from 'reflux'
import _ from 'lodash'
import Actions from './actions'
import generate from '../generate-refuels'

var localStorageKey = 'gas.refuels';

function getItemByDate(list, searchItem){
  return _.find(list, function(item) {
    return item.date === searchItem.date;
  });
}

function calculateMpg(miles, gallons) {
  if (!miles || !gallons) return 0;
  return Math.round((miles / gallons) * 10) / 10;
}

module.exports = Reflux.createStore({
  listenables: Actions,
  onSet: function(newItem) {
    if (!newItem.date) return;

    var foundItem = getItemByDate(this.list, newItem);
    if (!foundItem) {
      this.createItem(newItem);
    } else {
      this.updateItem(foundItem, newItem);
    }
  },
  createItem: function(item) {
    var newItem = _.extend(item, {
      mpg: calculateMpg(item.miles, item.gallons)
    });

    for (var i = this.list.length - 1; i > -1; i--) {
      if (this.list[i].date < newItem.date) {
        break;
      }
    }
    this.list.splice(i + 1, 0, newItem);

    this.updateList(this.list);
  },
  updateItem: function(item, newItem) {
    item.miles = newItem.miles;
    item.gallons = newItem.gallons;
    item.mpg = calculateMpg(item.miles, item.gallons);
    this.updateList(this.list);
  },
  onUnset: function(oldItem) {
    this.updateList(_.filter(this.list,function(item){
        return item.date !== oldItem.date;
    }));
  },
  updateList: function(list){
      //localStorage.setItem(localStorageKey, JSON.stringify(list));
      this.list = list;
      this.trigger(list);
  },
  getInitialState: function() {
      var loadedList = localStorage.getItem(localStorageKey);
      if (!loadedList) {
          this.list = generate();
      } else {
          this.list = JSON.parse(loadedList);
      }
      return this.list
  }
});
