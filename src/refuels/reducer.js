import generate from '../generate-refuels'

const initialState = generate()

export const ADD_REFUEL = 'ADD_REFUEL'
export const EDIT_REFUEL = 'EDIT_REFUEL'
export const REMOVE_REFUEL = 'REMOVE_REFUEL'
export const SELECT_REFUEL = 'SELECT_REFUEL'

export default function refuels(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REFUEL':
      return [
        {
          id: state.reduce((maxId, refuel) => Math.max(refuel.id), -1) + 1,
          date: action.data.date,
          miles: action.data.miles,
          gallons: action.data.gallons,
          mpg: calculateMpg(action.data.miles, action.data.gallons)
        },
        ...state
      ]
    case 'EDIT_REFUEL':
      return state.map(refuel => {
        if (refuel.id === action.data.id) {
          let newRefuel = Object.assign({}, refuel, action.data)
          newRefuel.mpg = calculateMpg(newRefuel.miles, newRefuel.gallons)
          return newRefuel
        }
        return refuel
      })
    case 'REMOVE_REFUEL':
      return state.filter(refuel =>
        refuel.id !== action.data.id
      )
    case 'SELECT_REFUEL':
      return state.map(refuel =>
        Object.assign({}, refuel, {
          focus: refuel.id === action.id
        })
      )
  }
}

export function calculateMpg(miles, gallons) {
  return Math.round((miles / gallons) * 10) / 10
}
