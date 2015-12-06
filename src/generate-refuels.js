module.exports = function() {
  var demoData = []

  for (let i = 0; i < 20; i++) {
    let date = new Date()
    demoData[i] = {
      date: date.setDate(date.getDate() - (20 - i)),
      gallons: ((Math.random() * (14 - 12)) + 12).toPrecision(3),
      miles: ((Math.random() * (300 - 240)) + 240).toPrecision(4),
      mpg: null
    }

    demoData[i].mpg = Math.round((demoData[i].miles / demoData[i].gallons) * 10) / 10
  }

  return demoData;
};
