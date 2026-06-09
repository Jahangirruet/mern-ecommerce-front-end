import React from 'react';
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../utility/utility.js";

export const ReviewStore = create((set)=>({
    isReviewSubmit:false,
    ReviewFormData:{des:"",rating:"5",productID:""},
    ReviewFormOnChange:(name, value)=>{
        set((state)=>({
            ReviewFormData:{
                ...state.ReviewFormData,
                [name]:value
            }
        }))
    },
    ReviewSaveRequest:async(PostBody)=>{
        try{
            set({ReviewFormData:true})
            let res = await axios.post(`/api/createriview`,PostBody)
            return res.data['status'] === "success"
        }
        catch(e){
            unauthorized(e.response.status);
        }
        finally{
            set({ReviewFormData:false});
        }
    }
}))

export default ReviewStore