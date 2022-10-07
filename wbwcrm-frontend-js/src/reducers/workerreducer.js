const initialState = {
    workers: [],
    select_tag_worker_list: [],
    errors: "",
    calendar_info: []
}

export default function workerReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_WORKERS':
            return{
                ...state,
                workers: action.payload,
                select_tag_worker_list: action.payload.map(worker_object => ({label: worker_object.name, value: worker_object.id}))
            }
        case 'CREATE_NEW_WORKER':
            return{
                ...state,
                workers: [...state.workers, action.payload[0]],
                select_tag_worker_list: [...state, {label: action.payload[0].name, value: action.payload[0].id}] 
            }
        case 'WORKER_ERROR':
            return{
                ...state,
                errors: action.payload
            }
        case 'REMOVE_WORKER_ERRORS':
            return{
                ...state,
                errors: ''
            }
        case 'USER_CALENDAR_INFORMATION':
            return{
                ...state,
                calendar_info: action.payload.map(element => {
                    return {attendees: element.attendees, categories: element.categories, 
                        end: element.end.dateTime, start: element.start.dateTime, isAllDay: element.isAllDay, location: element.location, 
                        recurrence: element.recurrence, subject: element.subject
                }})
            }
        default:
            return{
                ...state
            }
    }
}

