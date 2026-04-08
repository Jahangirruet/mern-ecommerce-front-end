import React from 'react';
import {create} from 'zustand'
import axios from 'axios'
import {unauthorized} from "../utility/utility.js";

export const CartStore = create((set)=>(
    {
      isCartSubmit:false,
      CartForm:{productID:"",color:"",size:""},

      CartFormChange:(name,value)=>
     {
        set((state)=>(
            {
              CartForm:
                  {
                    ...state.CartForm,
                    [name]:value
                  }
            }
        ))
     },
        CartSaveRequest:async(PostBody,productID,quantity)=>
        {
          try{
              set({isCartSubmit:true});
              const body = PostBody ?? {};
              body.productID = productID;
              body.qty = quantity;
              let res = await axios.post(`/api/savecartlist`,PostBody)
              return res.data['status'] === "success";
          } catch (e){
              //unauthorized(e.response.status);
              console.log(e);
          } finally{
              set({isCartSubmit:false});
          }
        },

        CartList: null,
        CartCount:0,
        CartListRequest:async()=>{
          try{
              let res = await axios.get(`/api/cartlist`);
              set({CartList:res.data['data']});
              set({CartCount: (res.data['data']).length});
          } catch(e){
              unauthorized(e.response.status);
          } finally{
              set({isCartSubmit:false});
          }
        },
        RemoveCartListRequest:async(productID)=>{
            try{
                set({CartList:null});
                await axios.post(`/api/removecartlist`,{"productID":productID});
            }catch(e){unauthorized(e.response.status);}
        }

   }
))

export default CartStore