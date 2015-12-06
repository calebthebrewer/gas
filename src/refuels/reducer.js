import generate from 'generate-refuels'

const initialState = generate()

export default function refuels(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REFUEL':
      return [
        {
          id: state.reduce((maxId, refuel) => Math.max(refuel.id), -1) + 1,
          date: action.data.date
          miles: action.data.miles,
          gallons: action.data.gallons,
          mpg: Math.round((actions.data.miles / actions.data.gallons) * 10) / 10
        },
        ...state
      ]
    case 'EDIT_REFUEL':
      return state.map(refuel => {
        if (refuel.id === action.data.id) {
          return Object.assign({}, refuel, action.data)
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
          focus: refuel.id === action.data.id
        })
      )
  }
}
