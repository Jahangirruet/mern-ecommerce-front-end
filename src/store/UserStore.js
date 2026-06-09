import React from 'react';
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../utility/utility.js";
import Cookies from 'js-cookie'

export const UserStore = create((set) => ({

    isLogin:()=>{
        return !!Cookies.get('token')
    },

    LoginFormData:{email:"",password:""},
    LoginFormOnChange:(name, value) => {
        set(state=>({
            LoginFormData:{
                ...state.LoginFormData,
                [name]: value
            }
        }))
    },

    UserRegisterRequest:async (name, email,password) => {
        set({ isFormSubmit: true });
        try { /* empty */
        let res = await axios.post('/api/userregistration', {name,email,password})
            set({ isFormSubmit: false });
            if (res.data['status'] === "success") {
                return { success: true,message:"register success" };
            } else {
                return { success: false, message: res.data['message'] };
            }

        }
        catch(error){
            console.log(error);
        }
    },

    VerifyLoginRequest: async (email, password) => {
        set({ isFormSubmit: true });
        try {
            // ✅ POST request with body
            let res = await axios.post(`/api/login`, { email, password });
            set({ isFormSubmit: false });
            if (res.data['status'] === "success") {
                localStorage.setItem("token", res.data['token']);
                return { success: true };
            } else {
                return { success: false, message: res.data['message'] };
            }
        } catch (error) {
            set({ isFormSubmit: false });
            return { success: false, message: error };
        }
    },

    UserLogOutRequest: async () => {
        try {
            set({ isFormSubmit: true });
            let res = await axios.post(`/api/userlogout`);
            set({ isFormSubmit: false });
            if (res.data['status'] === 'success') {
                Cookies.remove('token');
                return true;
            }
            return false;
        } catch (e) {
            set({ isFormSubmit: false });
            console.error("Logout error:", e.response?.data);  // ← see exact backend error
            return false;
        }
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