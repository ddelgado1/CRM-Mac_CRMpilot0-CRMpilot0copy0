const initialState = {
    workers: [],
    select_tag_worker_list: {}
}

export default function workerReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_WORKERS':
            return{
                ...state,
                workers: action.payload,
                select_tag_worker_list: action.payload.map(worker_object => ({label: worker_object.name, value: worker_object.id}))
            }
        default:
            return{
                ...state
            }
    }
}

