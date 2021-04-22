import axios from 'axios';
import { FETCH_USER } from './types';

// action creator - creates action to be sent to reducer
 export const fetchUser =  () => 
     /* action creator returns this function whenever called
        - ReduxThunk will call below function and pass in dispatch
     */
        async dispatch => {
         // make request wait for response .then() 
         // dispatch only after we recieve response
         const res = await axios.get('/api/current_user') 
         dispatch({ type: FETCH_USER, payload: res });
     };



