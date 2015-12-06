import expect from 'expect'
import refuels from './reducer'

let testDate = Date.now()

describe('refuels reducer', () => {
  it('should handle ADD_REFUEL', () => {
    expect(
      refuels([], {
        type: 'ADD_REFUEL',
        data: {
          date: testDate
          miles: 250,
          gallons: 10
        }
      })
    ).toEqual([{
      date: testDate,
      miles: 250,
      gallons: 10,
      mpg: 25
    }])
  })
})
