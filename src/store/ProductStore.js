import {create} from 'zustand'
import axios from 'axios'

export const ProductStore = create((set)=>({
    BrandList:null,
    BrandListRequest:async()=>{
        let res = await axios.get(`/api/ProductBrandList`);
        if(res.data['status']==="success"){
            set({BrandList:res.data['data']});
        }
    },

    CategoryList:null,
    CategoryRequest:async()=>{
        let res = await axios.get(`/api/ProductCategoryList`);
        if(res.data['status']==="success"){
            set({CategoryList:res.data['data']});
        }
    },

    SliderList:null,
    SliderRequest:async()=>{
        let res = await axios.get(`/api/ProductSliderList`);
        if(res.data['status']==="success"){
            set({SliderList:res.data['data']});
        }
    },

    ListByRemark:null,
    ListByRemarkRequest:async(Remark)=>{
        set({ListByRemark:null});
        let res = await axios.get(`/api/ProductListByRemark/${Remark}`);
        if(res.data['status']==="success"){
            set({ListByRemark:res.data['data']});
        }
    },

    ListProduct:null,
    ListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null});
        let res = await axios.get(`/api/ProductListByBrand/${BrandID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },
    ListByCategoryRequest:async(CategoryID)=>{
        set({ListProduct:null});
        let res = await axios.get(`/api/ProductListByCategory/${CategoryID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },
    ListByKeywordRequest:async(Keyword)=>{
        set({ListProduct:null});
        let res = await axios.get(`/api/ProductListByKeyword/${Keyword}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },

    ListByFilterRequest:async(postBody)=>{
        set({ListProduct:null});
        let res = await axios.post(`/api/ProductListByFilter`,postBody);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']});
        }
    },


    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
         set({SearchKeyword:keyword});
    },

    Details:null,
    DetailsRequest:async(id)=>{
        set({Details:null});
        let res = await axios.get(`/api/ProductDetails/${id}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']});
        }
    },

    ReviewList:null,
    ReviewRequest:async(id)=>{
        set({ReviewList:null});
        let res = await axios.get(`/api/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']});
        }
    },




}))

export default ProductStore;
