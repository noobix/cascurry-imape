import React from "react";
import CustomInput from "../Components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-50 bg-white rounded-3 mx-auto p-4">
        <h3>Login</h3>
        <p>Enter and confirm your new password</p>
        <form>
          <CustomInput
            id="resetPwd1"
            label="Password"
            type="password"
            placeholder="Password"
          />
          <CustomInput
            id="resetPwd2"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
          />
          <button
            style={{ background: "#ffd333" }}
            type="submit"
            className="border-0 px-3 py-2 text-white fw-bold w-100"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
