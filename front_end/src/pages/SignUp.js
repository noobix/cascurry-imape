import React from "react";
import { string, object } from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import { validate } from "secure-password-validator";
import first10000 from "secure-password-validator/build/main/blacklists/first10_000";
import { getCountries } from "country-state-picker";
import Container from "../components/Container";
import MetaData from "../components/MetaData";
import CustomInput from "../components/CustomInput";
import { getCountryList, registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, countryList } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getCountryList());
  }, [dispatch]);
  const handleSelect = (e) => {
    const list = getCountries();
    const info = list.filter((data) => data.name === e.target.value);
    formik.setFieldValue("country", e.target.value);
    formik.setFieldValue("mobile", info[0].dial_code);
  };
  const schema = {
    maxLength: 50,
    blacklist: first10000,
    digits: true,
    letters: true,
  };
  let signUpSchema = object({
    firstname: string().required(),
    lastname: string().required(),
    email: string().required(),
    country: string().required(),
    mobile: string().required(),
    addressLine1: string(),
    addressLine2: string(),
    password: string().required(),
    repeatPassword: string().required(),
  });
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      country: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      if (formik.values.password !== formik.values.repeatPassword)
        return (formik.errors.repeatPassword = "Password is not a match");
      const valid = validate(formik.values.password, schema);
      if (!valid.valid)
        return (formik.errors.password = valid.errors.map((err) => {
          let display =
            err.toLowerCase() === "min_length"
              ? "Password does not reach minimum length"
              : err.toLowerCase() === "max_length"
              ? "You have exceeded the password length of 50"
              : err.toLowerCase() === "digits"
              ? "You are required to have a number in your password"
              : err.toLowerCase() === "letters"
              ? "Your are required to have a letter in your password"
              : err.toLowerCase() === "blacklist"
              ? "Your password has passed the blacklist and can be predicted"
              : undefined;
          return display;
        }));
      const { addressLine1, addressLine2, ...left } = values;
      values = { ...left, address: { addressLine1, addressLine2 } };
      dispatch(registerUser(values));
      !isError && formik.resetForm();
      setTimeout(() => navigate("/"), 500);
    },
  });
  return (
    <React.Fragment>
      <MetaData title="SignUp" />
      <BreadCrumb title="Signup" />
      <Container className="signup-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="signup-card">
              <h3 className="text-center mb-3">Sign up</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <div className="d-flex justify-content-between gap-10">
                  <div className="d-flex flex-column">
                    <CustomInput
                      type="text"
                      name="fname"
                      placeholder="First name*"
                      onChange={formik.handleChange("firstname")}
                      value={formik.values.firstname}
                      onBlur={formik.handleChange("firstname")}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="mb-2 mt-0 validation-error">
                        {formik.errors.firstname}
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="d-flex flex-column">
                    <CustomInput
                      type="text"
                      name="lname"
                      placeholder="Last name*"
                      onChange={formik.handleChange("lastname")}
                      value={formik.values.lastname}
                      onBlur={formik.handleChange("lastname")}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="mb-2 mt-0 validation-error">
                        {formik.errors.lastname}
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </div>
                <CustomInput
                  type="emal"
                  name="email"
                  placeholder="Email*"
                  onChange={formik.handleChange("email")}
                  value={formik.values.email}
                  onBlur={formik.handleChange("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.email}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect2"
                    aria-label="Floating label select example"
                    name="country"
                    onChange={handleSelect}
                    value={formik.values.country}
                    onBlur={formik.handleChange("country")}
                  >
                    <option defaultValue>Open this select menu</option>
                    {countryList &&
                      countryList.length > 0 &&
                      countryList.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                  {formik.touched.country && formik.errors.country ? (
                    <div className="mb-2 mt-0 validation-error">
                      {formik.errors.country}
                    </div>
                  ) : (
                    <span></span>
                  )}
                  <label htmlFor="floatingSelect2">
                    Country&nbsp;/&nbsp;Region
                  </label>
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Phone*"
                  length={13}
                  onChange={formik.handleChange("mobile")}
                  value={formik.values.mobile}
                  onBlur={formik.handleChange("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.mobile}
                  </div>
                ) : (
                  <span></span>
                )}
                <CustomInput
                  type="text"
                  name="addressLine1"
                  placeholder="Address 1"
                  onChange={formik.handleChange("addressLine1")}
                  value={formik.values.addressLine1}
                  onBlur={formik.handleChange("addressLine1")}
                />
                {formik.touched.addressLine1 && formik.errors.addressLine1 ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.addressLine1}
                  </div>
                ) : (
                  <span></span>
                )}
                <CustomInput
                  type="text"
                  name="addressLine2"
                  placeholder="Address 2"
                  onChange={formik.handleChange("addressLine2")}
                  value={formik.values.addressLine2}
                  onBlur={formik.handleChange("addressLine2")}
                />
                {formik.touched.addressLine2 && formik.errors.addressLine2 ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.addressLine2}
                  </div>
                ) : (
                  <span></span>
                )}
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder="Password*"
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  onBlur={formik.handleChange("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.password}
                  </div>
                ) : (
                  <span></span>
                )}
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder="Confirm Password*"
                  onChange={formik.handleChange("repeatPassword")}
                  value={formik.values.repeatPassword}
                  onBlur={formik.handleChange("repeatPassword")}
                />
                {formik.touched.repeatPassword &&
                formik.errors.repeatPassword ? (
                  <div className="mb-2 mt-0 validation-error">
                    {formik.errors.repeatPassword}
                  </div>
                ) : (
                  <span></span>
                )}
                <div className="d-flex align-items-center justify-content-center gap-15">
                  <button className="button border-0" type="submit">
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SignUp;
