const initialState = {
    tables: [],
    tables_ordered_by_customer: {},
    searched_rows: []
}

export default function workerContactReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_JOIN_TABLE_INFORMATION':
            let orderedObject = {};
            for (const row of action.payload){
                if (Object.keys(orderedObject).includes('' + row.contact_id)){ //As in if the object already has that customer in it
                    orderedObject[row.contact_id].push(row.worker_id)
                }
                else{
                    orderedObject[row.contact_id] = [row.worker_id]
                }
            }
            return{
                ...state,
                tables: action.payload,
                tables_ordered_by_customer: orderedObject
            }
        case 'CREATE_NEW_JOIN_TABLES':
            return{
                ...state,
                tables: state.tables.concat(action.payload)
            }
        case 'JOIN_TABLE_ROWS_DESTROYED':
            return{
                ...state,
                tables: state.tables.filter(row => row.contact_id !== action.payload)
            }
        // case 'SEARCH_FOR_JOIN_TABLE_ROWS':
        //     //Here we receive the list of workers searched for and then return all of the customers (contacts) that include them by their ids
        //     //Action payload here looks like this [{label: <worker_name>, value: <worker_id>}, {label: <next_worker_name>, value: <next_worker_id>}...]
        //     let rowsWithWorkers = []; //Rather than just filtering, we're going to filter then concat the two 
        //     for (const workerObject of action.payload){
        //         rowsWithWorkers = rowsWithWorkers.concat(state.tables.filter(row => row.worker_id === workerObject.value))
        //     }
        //     rowsWithWorkers.map((row) => {
        //         return row.contact_id
        //     })
        //     return{
        //         ...state,
        //         searched_rows: rowsWithWorkers
        //     }
        default:
            return{
                ...state
            }
    }
}