import tape from 'tape'
import {
  default as refuels,
  calculateMpg,
  ADD_REFUEL,
  EDIT_REFUEL,
  REMOVE_REFUEL,
  SELECT_REFUEL
} from './reducer'

let testDate = Date.now()

tape.test('ADD_REFUEL', (t) => {
  t.plan(1)

  t.deepEqual(
    refuels([],
      {
        type: ADD_REFUEL,
        data: {
          date: testDate,
          miles: 250,
          gallons: 10
        }
      }
    ),
    [{
      id: 0,
      date: testDate,
      miles: 250,
      gallons: 10,
      mpg: 25
    }],
    'refuels can be added to the state'
  )
})

tape.test(EDIT_REFUEL, (t) => {
  t.plan(1)

  t.deepEqual(
    refuels([
      {
        id: 0,
        date: testDate,
        miles: 250,
        gallons: 10,
        mpg: 25
      }],
      {
        type: EDIT_REFUEL,
        data: {
          id: 0,
          miles: 200
        }
      }
    ),
    [{
      id: 0,
      date: testDate,
      miles: 200,
      gallons: 10,
      mpg: 20
    }],
    'refuels can be edited in the state'
  )
})

tape.test(REMOVE_REFUEL, (t) => {
  t.plan(1)

  t.deepEqual(
    refuels([
      {
        id: 0,
        date: testDate,
        miles: 250,
        gallons: 10,
        mpg: 25
      }],
      {
        type: REMOVE_REFUEL,
        data: {
          id: 0
        }
      }
    ),
    [],
    'refuels can be removed from the state'
  )
})

tape.test(SELECT_REFUEL, (t) => {
  t.plan(2)

  t.deepEqual(
    refuels([
      {
        id: 0,
        date: testDate,
        miles: 250,
        gallons: 10,
        mpg: 25
      }],
      {
        type: SELECT_REFUEL,
        id: 0
      }
    ),
    [{
      id: 0,
      date: testDate,
      miles: 250,
      gallons: 10,
      mpg: 25,
      focus: true
    }],
    'refuels can be selected in state'
  )

  t.deepEqual(
    refuels([
      {
        id: 0,
        date: testDate,
        miles: 250,
        gallons: 10,
        mpg: 25,
        focus: true
      },
      {
        id: 1,
        date: testDate,
        miles: 200,
        gallons: 10,
        mpg: 20
      }],
      {
        type: SELECT_REFUEL,
        id: 1
      }
    ),
    [
      {
        id: 0,
        date: testDate,
        miles: 250,
        gallons: 10,
        mpg: 25,
        focus: false
      },
      {
        id: 1,
        date: testDate,
        miles: 200,
        gallons: 10,
        mpg: 20,
        focus: true
      }
    ],
    'selecting a refuel de-selects other refuels in state'
  )
})

tape.test('caculate MPG', (t) => {
  t.plan(2)

  t.equal(
    calculateMpg(250, 10),
    25,
    'can calculate MPG correctly'
  )

  t.equal(
    calculateMpg(255, 12),
    21.3,
    'correctly rounds to one significant figure'
  )
})
