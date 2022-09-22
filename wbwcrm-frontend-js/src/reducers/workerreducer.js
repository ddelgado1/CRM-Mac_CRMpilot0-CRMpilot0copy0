const initialState = {
    workers: {}
}

export default function workerReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_WORKERS':
            return{
                ...state,
                workers: action.payload.map(worker_object => ({label: worker_object.name, value: worker_object.id}))
            }
        default:
            return{
                ...state
            }
    }
}

