const initialState = {
    tables: []
}

export default function workerContactReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_JOIN_TABLE_INFORMATION':
            return{
                ...state,
                tables: action.payload
            }
        case 'CREATE_NEW_JOIN_TABLES':
            return{
                ...state,
                tables: state.tables.concat(action.payload)
            }
        default:
            return{
                ...state
            }
    }
}