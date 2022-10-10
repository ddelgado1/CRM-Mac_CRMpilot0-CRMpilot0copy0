const initialState = {
    calendar_info: [],
    errors: ""
    
}

export default function calendarReducer(state = initialState, action){
    switch(action.type){
        case 'USER_CALENDAR_INFORMATION':
            return{
                ...state,
                calendar_info: action.payload
            }
        case 'CALENDAR_ERROR':
            return{
                ...state,
                errors: action.payload
            }
        case 'REMOVE_CALENDAR_ERRORS':
            return{
                ...state,
                errors: ''
            }
        default:
            return{
                ...state
            }
    }
}

