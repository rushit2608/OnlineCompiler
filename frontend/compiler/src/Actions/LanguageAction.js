import React from "react";
import {
  LANGUAGE_CHANGE_FAIL,
  LANGUAGE_CHANGE_REQUEST,
  LANGUAGE_CHANGE_SUCCESS,
} from "../Constants/LanguageConstant";

import axios from "axios";
// import { languages } from "prismjs/components/prism-core";


export const LanguageActions = (type) => async (dispatch) => {
    try{
        dispatch({type:LANGUAGE_CHANGE_REQUEST});
        const {data}  =  await axios.get(`/language/${type}`)

        dispatch({
            type: LANGUAGE_CHANGE_SUCCESS,
            payload: data,
          });
        
    }catch(error){
        dispatch({
            type: LANGUAGE_CHANGE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
    }
}