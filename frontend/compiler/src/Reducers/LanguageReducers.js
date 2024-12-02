import React from "react";
import {
    LANGUAGE_CHANGE_FAIL,
    LANGUAGE_CHANGE_REQUEST,
    LANGUAGE_CHANGE_SUCCESS,
  } from "../Constants/LanguageConstant";
  
  import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    languagescript: null,
  };
  
  export const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
      case LANGUAGE_CHANGE_REQUEST:
        return { ...state, loading: true, error: null }; // Reset error on request
      case LANGUAGE_CHANGE_SUCCESS:
        return { ...state, loading: false, languagescript: action.payload };
      case LANGUAGE_CHANGE_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };