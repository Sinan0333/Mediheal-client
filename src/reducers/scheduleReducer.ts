import { ScheduleType } from "../types/doctorTypes";

export const initSchedule:ScheduleType={
    startTime:9,
    endTime:15,
    interval:30
}

export type ScheduleAction =
  | { type: 'SET_START_TIME'; payload: number }
  | { type: 'SET_END_TIME'; payload: number }
  | { type: 'SET_INTERVAL'; payload: number };


export const scheduleReducer = (state:ScheduleType,action:ScheduleAction):ScheduleType =>{
    switch(action.type){
        case 'SET_START_TIME':
            return {...state,startTime:action.payload};
        case 'SET_END_TIME':
            return {...state,endTime:action.payload};
        case 'SET_INTERVAL':
            return {...state,interval:action.payload};
        default:
            return state
    }
}