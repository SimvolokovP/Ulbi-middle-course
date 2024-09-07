import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import UserService from "../../api/UserService";
import { IEvent } from "../../models/IEvent";

type EventState = {
  events: IEvent[] | [];
  guests: IUser[] | [];
};

const initialState: EventState = {
  events: [],
  guests: [],
};

export const getUsers = createAsyncThunk(
  "event/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getUsers();
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (targetUser: string | undefined, { rejectWithValue }) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      const targetEvents = json.filter(
        (event) => event.author === targetUser || event.guest === targetUser
      );
      console.log(targetEvents);
      return targetEvents;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (event: IEvent, { rejectWithValue }) => {
    try {
      const events = localStorage.getItem("events") || "[]";
      const json = JSON.parse(events) as IEvent[];
      json.push(event);
      localStorage.setItem("events", JSON.stringify(json));
      return event;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addNewEvent(state, action: PayloadAction<IEvent>) {
      [...state.events].push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.guests = action.payload;
      }
    );
    builder.addCase(getUsers.rejected, (state, action) => {
      console.error("Failed to fetch users:", action.payload);
    });
  },
});

export const { addNewEvent } = eventSlice.actions;

export default eventSlice.reducer;
