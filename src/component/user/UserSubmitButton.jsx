import React from 'react';
import UserStore from "../../store/UserStore.js";

const UserSubmitButton = (props) => {
    let { isFormSubmit } = UserStore();
    if (!isFormSubmit) {
        return (
            <button onClick={props.onClick} type="submit" className={props.className}>
                {props.text}
            </button>
        );
    }
    return (
        <button type="button" className={props.className} disabled>
            <div className="spinner-border spinner-border-sm" role="status"></div>
            {" "}Processing...
        </button>
    );
};

export default UserSubmitButton;