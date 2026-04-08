import React from 'react';
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../utility/utility.js";

const WishStore = create((set)=>({
    isWishSubmit:false,
    WishSaveRequest:async(productID)=>
    {
        try{
            set({isWishSubmit:true});
            let res = await axios.post(`/api/savewishlist`,{productID:productID});
            return res.data['status'] === "success";
        } catch (e){
            unauthorized(e.response.status);
            console.log(e);
        } finally{
            set({isWishSubmit:false});
        }
    },

    WishList: null,
    WishCount:0,
    WishListRequest:async()=>{
        try{
            let res = await axios.get(`/api/WishList`);
            set({WishList:res.data['data']});
            set({WishCount: (res.data['data']).length});
        } catch(e){
            //unauthorized(e.response.status);
            console.log(e);
        } finally{
            set({isWishSubmit:false});
        }
    },
    RemoveWishListRequest:async(productID)=>{
        try{
            set({WishList:null});
            await axios.post(`/api/removewishlist`,{"productID":productID});
        }catch(e){unauthorized(e.response.status);}
    }


}))

export default WishStore;