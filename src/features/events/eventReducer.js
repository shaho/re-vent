import { sampleData } from "../../app/api/sampleData";
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./eventConstants";

const initialState = {
  events: sampleData,
};

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => {
            return event.id !== payload.id;
          }),
          payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => {
            return event.id !== payload;
          }),
        ],
      };
    default:
      return state;
  }
};

export default eventReducer;
