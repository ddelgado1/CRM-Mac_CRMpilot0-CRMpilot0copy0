const initialState = {
    contacts: [],
    selected_customer: {},
    selected_customer_workers: [],
    searched_customers: [],
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
                selected_customer: {...state.selected_customer, notes: state.selected_customer.notes + action.payload.value}
            }
        case 'CUSTOMER_DESTROYED':
            return{
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                selected_customer: {},
                selected_customer_workers: []

            }
        case 'REMOVE_CONTACT_ERROR_AND_SEARCHED_CUSTOMERS':
            return{
                ...state,
                errors: action.payload,
                searched_customers: []
            }
        case 'REMOVE_CONTACT_ERROR':
            return{
                ...state,
                errors: ""
            }
        case 'CREATE_NEW_CONTACT':
            return{
                ...state,
                contacts: [...state.contacts, action.payload.contact],
                selected_customer: action.payload.contact,
                selected_customer_workers: action.payload.workers
            }
        case 'SEARCH_FOR_CUSTOMERS':
            //Here, our action.payload looks like this: {search_qualities: {company: "...", contact_name: "...", category: "..."}, worker_id: <id of worker selected>, all_joins: <every join table categorized by worker>}}
            let filteredOutCustomers = state.contacts;
            console.log(action.payload.worker_id)
            for (const key of Object.keys(action.payload.search_qualities)){
                //The purpose of this for loop is to filter out only the ones that match the qualities. The reason we use let is we want it to be somthing that keeps filtering so that it meets all of the qualities
                //Now that we have this, we need to filter it further by checking all of the join tables, which we will do in the join table reducer, then just take the intersection of the two
                if (action.payload.search_qualities[key] !== ""){
                    filteredOutCustomers = filteredOutCustomers.filter(individualCustomer => individualCustomer[key] === action.payload.search_qualities[key])
                }
            }
            debugger;
            if (action.payload.worker_id){//We don't include an else because we already have what would happen saved to filteredOutCustomers if an else clause was used
                filteredOutCustomers = filteredOutCustomers.filter(individualCustomer => action.payload.all_joins[individualCustomer.id].includes(action.payload.worker_id)) //Here we do the final step where we filter it even further so that it only has the ones where the workers are in it
            }
            filteredOutCustomers.sort((a,b) => {//This makes it so that 
                return action.payload.all_joins[a.id].length - action.payload.all_joins[b.id].length; 
            })
            return{
                ...state,
                searched_customers: filteredOutCustomers
            }
        default:
            return{
                ...state
            }
    }
}