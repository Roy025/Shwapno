import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const navigate = useNavigate();
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, email, password, confirmpassword } = signupData;
  const signup = async () => {
    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    try {
      await axios
        .post("http://localhost:3000/api/users", {
          name: name,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
        })
        .then((response) => {
          localStorage.setItem("accesstoken", response.data.token);
          localStorage.setItem("email", response.data.email);
          console.log(response);
          if (response.data.success === false) {
            toast(response.data.message);
          } else {
            if (response.status === 201) {
              toast.success("User registered successfully");
              setTimeout(() => {
                navigate("/api/products/inventory");
              }, 1000);
            }
          }
        })
        .catch((err) => {
          const message = err.response?.data?.message || "Registration failed";
          toast.error("Error: " + message);
        });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    toast(signupData);
  };
  const handleChange = (e) => {
    const sign = e.target.name;
    setsignupData({ ...signupData, [sign]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="h-100 bg-dark">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src="https://www.futurefund.com/wp-content/uploads/2021/11/Future_Fund-2021-Website_Assets_Automatic_Registration.png"
                      className="col-12 pic"
                      alt="Sample photo"
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase fw-bold">Register</h3>

                      <form action="" onSubmit={handleSubmit}>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-account"></i>
                            </div>
                            <input
                              className="form-control"
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Name"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-email"></i>
                            </div>
                            <input
                              className="form-control"
                              required
                              id="email"
                              name="email"
                              type="email"
                              placeholder="E-mail"
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-lock"></i>
                            </div>
                            <input
                              className="form-control"
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-4 form-group">
                          <div className="input-group">
                            <div className="input-group-addon icon">
                              <i className="zmdi zmdi-lock"></i>
                            </div>
                            <input
                              className="form-control"
                              id="confirmpassword"
                              name="confirmpassword"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-md-grid justify-content-md-end">
                          <button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={signup}
                          >
                            Register
                          </button>
                          <p className="forgot-password text-right mt-3">
                            Already registered?{" "}
                            <a href="/api/users/login">Login</a>{" "}
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
