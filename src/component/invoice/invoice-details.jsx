import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import cartStore from "../../store/CartStore.js";
import ReviewStore from "../../store/ReviewStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import CartListSkeleton from "../../skeleton/CartList-skeleton.jsx";
import {Modal} from "react-bootstrap";
import ReviewSubmitButton from "../Review/ReviewSubmitButton.jsx";

const InvoiceDetails = () => {
    const [show,setShow] = React.useState();
    const handleClose = () => setShow()


    let {ReviewFormData,ReviewFormOnChange,ReviewSaveRequest} = ReviewStore()

    const ReviewModel = (id) =>{
        setShow(true);
        ReviewFormOnChange('productID',id)
    }

    const {id} = useParams();
    let {InvoiceDetails,InvoiceDetailsRequest} =cartStore();


    useEffect(()=>{
        (async () => {
            await InvoiceDetailsRequest(id);
        })()
    },[id]);

    const submitReview = async () => {
        if(ValidationHelper.IsEmpty(ReviewFormData.des)){
            toast.error("Review required");
        } else{
            let res =await ReviewSaveRequest(ReviewFormData);
            res?toast.success("New review successfully"):toast.error("Something went wrong!");
            setShow(false)
        }
    };

  if(InvoiceDetails==null){
        return <CartListSkeleton />
    } else{
      return (
          <div className="container mt-3">
              <div className="row">
                  <div className="col-md-12">
                      <div className="card p-4">
                          <ul className="list-group list-group-flush">
                              {
                                  InvoiceDetails.map((item,i)=>{
                                      return(<li className="list-group-item d-flex justify-content-center align-items-start">
                                          <img className="rounded-1" width="90" height="auto" src={item['image']} alt={item.title}/>
                                          <div className="ms-2 me-auto">
                                              <div className="fw-medium h6">
                                                  {item['product']['title']}
                                              </div>
                                              <span>Unit price: {item['price']}, Total:{item['price']*parseInt(item['qty'])}</span>
                                              <span >Qty: {item['qty']} , Size:{item['size']}, Color:{item['color']}</span>
                                          </div>
                                          <button className='btn btn-success' onClick={()=>ReviewModel(item['productID'])}>Create Review</button>
                                      </li>)
                                  })
                              }
                          </ul>
                      </div>
                  </div>
              </div>

              <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                      <h6>Create Review</h6>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="row">
                          <div className="col-12 p-2">
                              <label className="form-label">Rating</label>
                              <select onChange={(e)=>ReviewFormOnChange('rating',e.target.value)} className="form-select">
                                  <option value="5">5 star</option>
                                  <option value="4">4 star</option>
                                  <option value="3">3 star</option>
                                  <option value="2">2 star</option>
                                  <option value="1">1 star</option>
                              </select>
                          </div>
                          <div className="col-12 p-2">
                              <label className="form-label">Review</label>
                              <textarea onChange={(e)=>ReviewFormOnChange('des',e.target.value)} className="form-select"></textarea>
                          </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <button className="btn btn-dark" onClick={handleClose}>close</button>
                      <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview}/>
                  </Modal.Footer>
              </Modal>
          </div>
      )
  }
};

export default InvoiceDetails;