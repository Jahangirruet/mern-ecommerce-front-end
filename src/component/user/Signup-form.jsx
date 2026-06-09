import React from 'react';
import SubmitButton from './UserSubmitButton.jsx';
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const SignupForm = () => {
    let navigate = useNavigate()
    let {LoginFormData,LoginFormOnChange,UserRegisterRequest} = UserStore();
    let OnFormSubmit = async () => {
        if (!ValidationHelper.IsEmail(LoginFormData.email)) {
            toast.error("Valid email address required!");
        } else {
            let res = await UserRegisterRequest(LoginFormData.name,LoginFormData.email, LoginFormData.password);
            res?.success ? navigate("/") : toast.error(res?.message || "Invalid email or password");        }
    }
    return (
        <>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="card p-5">
                            <h4>Enter Your Email</h4>
                            <p>A verification code will be sent to the email address you provide</p>
                            <input value={LoginFormData.name} onChange={(e)=>{LoginFormOnChange("name",e.target.value)}} placeholder="User name" type="text" className="form-control"/><br/>
                            <input value={LoginFormData.email} onChange={(e)=>{LoginFormOnChange("email",e.target.value)}} placeholder="Email Address" type="email" className="form-control"/><br/>
                            <input value={LoginFormData.password} onChange={(e)=>{LoginFormOnChange("password",e.target.value)}} placeholder="Password Address" type="password" className="form-control"/>
                            <SubmitButton onClick={OnFormSubmit} className="btn mt-3 btn-success" text="Next"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupForm;