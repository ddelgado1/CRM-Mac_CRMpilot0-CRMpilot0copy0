const initialState = {
    contacts: [],
    selected_customer: {},
    selected_customer_workers: [],
    errors: ""
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
                selected_customer: action.payload.contact,
                selected_customer_workers: action.payload.workers
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
        case 'CONTACT_ERROR':
            return{
                ...state,
                errors: action.payload
            }
        case 'CREATE_NEW_CONTACT':
            return{
                ...state,
                contacts: [...state.contacts, action.payload.contact],
                selected_customer: action.payload.contact,
                selected_customer_workers: action.payload.workers
            }
        default:
            return{
                ...state
            }
    }
}