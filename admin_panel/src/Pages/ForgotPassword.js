import React from "react";
import CustomInput from "../Components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h3>Forgot password</h3>
        <p>Enter your email address to recieve a reset email</p>
        <form>
          <CustomInput
            id="usremail"
            label="Email"
            type="email"
            placeholder="Email Address"
          />
          <button
            style={{ background: "#ffd333" }}
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
