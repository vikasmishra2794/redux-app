/* 
  src/reducers/weatherReducer.js
*/
export default (state = {}, action) => {
  switch (action.type) {
    case 'WEATHER_ACTION_PENDING':
      return {
        result: {},
        isFetching: true
      }
    case 'WEATHER_ACTION_SUCCESS':
      return {
        result: action.payload,
        isFetching: false
      }
    case 'WEATHER_ACTION_FAILURE':
      return {
        error: action.error,
        isFetching: false
      }
    default:
      return state
  }
}
