const initialState = {
    contacts: [],
    selected_customer: {}
}

export default function contactReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_CONTACTS':
            return{
                ...state,
                contacts: action.payload
            }
        case 'CUSTOMER_SHOW_PAGE':
            return{
                ...state,
                selected_customer: action.payload
            }
        case 'NOTE_UPDATED':
            return{
                ...state,
                contacts: action.payload.contacts,
                selected_customer: action.payload.chosen_customer //Since we're returning an updated version on the backend, this is enough
            }
        case 'CONTACT_DESTROYED':
            return{
                ...state,
                contacts: action.payload.contacts
            }
        default:
            return{
                ...state
            }
    }
}