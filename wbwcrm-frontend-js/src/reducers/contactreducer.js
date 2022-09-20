const initialState = {
    contacts: []
}

export default function contactReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_CONTACTS':
            return{
                ...state,
                contacts: action.payload
            }
        default:
            return{
                ...state
            }
    }
}