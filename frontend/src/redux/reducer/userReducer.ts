import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface UserState {
    loading: boolean;
    user: User | null;
  }

const initialState:UserState={
    loading:false,
    user:null
};

export const userReducer = createSlice({
    name:'userReducer',
    initialState,
    reducers:{
        userExist:(state,action:PayloadAction<User>)=>{
            state.loading=false;
            state.user=action.payload;
        },
        userNotExist:(state)=>{
            state.loading=false;
            state.user=null;
        },
        resetUser:(state)=>{
            state=initialState;
            
        }
    }
});


export const {userExist,userNotExist,resetUser}= userReducer.actions