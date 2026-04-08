import React from 'react';
import {create} from 'zustand'
import axios from 'axios'
import {getEmail, setEmail, unauthorized} from "../utility/utility.js";
import Cookies from 'js-cookie'

export const UserStore = create((set) => ({

    isLogin:()=>{
        return !!Cookies.get('token')
    },

    LoginFormData:{email:""},
    LoginFormOnChange:(name, value) => {
        set(state=>({
            LoginFormData:{
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },
    OTPFormData:{otp:""},
    OTPFormOnChange:(name, value) => {
        set(state=>({
            OTPFormData:{
                ...state.OTPFormData,
                [name]: value
            }
        }))
    },
    isFormSubmit:false,
    UserOTPRequest:async(email)=>{
       set({isFormSubmit:true})
       let res = await axios.get(`/api/userotp/${email}`);
       setEmail(email);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
   },

    VerifyOTPRequest:async(otp)=>{
        set({isFormSubmit:true})
        let email = getEmail();
       let res = await axios.get(`/api/verifyotp/${email}/${otp}`);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },
    UserLogOutRequest:async()=>{
        set({isFormSubmit:true})
        let res = await axios.get(`/api/userlogout`);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },

    ProfileForm: {cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""},

    ProfileFormChange:async(name, value)=>{
        set((state)=>({
            ProfileForm:{
                ...state.ProfileForm,
                [name]:value
            }
        }))
    },

    ProfileDetails:null,
    ProfileDetailsRequest:async()=>{
        try{
            let res = await axios.get(`/api/readprofile`);
            if(res.data['data'].length>0){
                set({ProfileForm:res.data['data'][0]});
                set({ProfileDetails:res.data['data'][0]});
            }else {
                set({ProfileDetails:[]});
            }
        }
        catch(e) { unauthorized(e.response.status) }
    },
    ProfileSaveRequest:async(PostBody)=>{
        try{
            set({ProfileDetails:null});
            let res = await axios.post(`/api/CreateProfile`,PostBody);
            return res.data['status'] === "success";
        }
        catch(e) { unauthorized(e.response.status) }
    }
}))

export default UserStore;