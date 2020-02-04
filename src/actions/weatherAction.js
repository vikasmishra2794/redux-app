/* 
  src/actions/weatherAction.js
*/

export const weatherAction = (zipCode) => dispatch => {
  console.log("zipCode:===", zipCode);
  dispatch({
        type: 'WEATHER_ACTION_PENDING'
      })
  return fetch(`http://localhost:8080/weather?zipCode=${zipCode}`).then(
    res => res.json()
  ).then(json => {
    dispatch({
        type: 'WEATHER_ACTION_SUCCESS',
        payload: json
      })
  }).catch(err => {
    dispatch({
        type: 'WEATHER_ACTION_FAILURE',
        error: err
      })
  })
}
