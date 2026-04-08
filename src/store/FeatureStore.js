import {create} from 'zustand'
import axios from 'axios'

export const FeatureStore = create((set)=>({
    FeatureList:null,
    FeatureListRequest:async()=>{
        let res = await axios.get(`/api/features`);
        if(res.data['status']==="success"){
            set({FeatureList:res.data['data']});
        }
    },
    LegalDetails: null,
    LegalDetailsRequest:async(type)=>{
        set({LegalDetails:null});
        let res = await axios.get(`/api/legaldetails/${type}`);
        if(res.data['status']==="success"){
            set({LegalDetails:res.data['data']});
        }
    }

}))

export default FeatureStore;