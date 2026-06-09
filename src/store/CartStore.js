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
        CartTotal:0,
        CartVatTotal:0,
        CartPayable:0,
        CartListRequest:async()=>{
          try{
              let res = await axios.get(`/api/cartlist`);
              set({CartList:res.data['data']});
              set({CartCount: (res.data['data']).length});
              let total= 0;
              let vat = 0;
              let payable = 0;
              res.data['data'].forEach((item,i)=>{
                  if(item['product']['discount']===true){
                      total=total+parseInt(item['qty'])*parseInt(item['product']['discountPrice'])
                  } else{
                      total=total+parseInt(item['qty'])*parseInt(item['product']['price'])
                  }
              })
              vat = total*0.05;
              payable = vat + total
              set({CartTotal:total});
              set({CartVatTotal:vat});
              set({CartPayableTotal:payable});
          } catch(e){
              unauthorized(e.response.status);
          } finally{
              set({isCartSubmit:false});
          }
        },
        RemoveCartListRequest:async(cartID)=>{
            try{
                set({CartList:null});
                await axios.post(`/api/removecartlist`,{"_id":cartID});
            }catch(e){
                console.log("err: ",e);
                //unauthorized(e.response.status);
                }
        },

        CreateInvoiceRequest:async()=>{
          try {
              set ({isCartSubmit:true});
              let res = await axios.get(`/api/createinvoice`);
              window.location.href = res.data['data']['GatewayPageURL']
          }catch(e){
            unauthorized(e.response.status);
          }finally {
                set({isCartSubmit:false});
          }
        },

        InvoiceList: null,
        InvoiceListRequest:async()=>{
          try{
              let res = await axios.get(`/api/invoicelist`);
              set({InvoiceList:res.data['data']});
          }
            catch(e){
              unauthorized(e.response.status);
            }
            finally {
              set({isCartSubmit:false});
          }
        },

        InvoiceDetails:null,
        InvoiceDetailsRequest:async(id)=>{
            try{
                let res = await axios.get(`/api/invoiceproductList/${id}`);
                console.log("id:",id);
                set({InvoiceDetails:res.data['data']});
            }
            catch(e){
                unauthorized(e.response.status);
            }
            finally {
                //set({isCartSubmit:false});
            }
        }

   }
))

export default CartStore