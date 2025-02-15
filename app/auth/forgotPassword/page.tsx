import React, { useState, useRef, Fragment, useEffect } from "react";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

const page = () => {
  return (
    <Fragment>
                {showForgotPassword && (
          <div className="bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl">
            <div>
              {emailInput && (
                <div>
                  <div className="flex">
                    <div
                      className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                      onClick={handleBackClick}
                    >
                      <img src={ArrowLeft} alt="" className="cursor-pointer" />
                    </div>
                    <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                      Back
                    </p>
                  </div>
                  <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
                    Forgot Password
                    <p className="text-xs font-Inter text-[#9A9AB0] my-3">
                      Enter the email address you used when you joined and
                      we’llsend you instructions to reset your password. <br />
                      <br />
                      For security reasons, we do NOT store your password. So
                      rest assured that we will never send your password via
                      email.
                    </p>
                    <Formik
                      initialValues={{
                        email: "",
                      }}
                      validationSchema={Yup.object({
                        email: Yup.string()
                          .required("Email is required")
                          .test(
                            "valid-email",
                            "Email must be valid",
                            function (value) {
                              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                            }
                          ),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        api
                          .post(API_URLS.user.forgetPassword, values)
                          .then((res) => {
                            console.log(res);
                            emailRef.current = values.email;
                            handleResetPasswordClick();
                          })
                          .catch(function (error) {
                            console.error(error);
                          });
                      }}
                    >
                      {(formik) => (
                        <form
                          className="flex flex-col items-center gap-4 mt-8"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="font-Mulish sm:w-[300px] w-[200px]">
                            <p className="pb-1 text-xs font-semibold">Email</p>
                            <div className="relative flex">
                              <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                 className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                              />
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                              <div className="text-red-700 text-xs">
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex flex-col mt-7">
                            <button
                              type="submit"
                              className="w-[170px] font-Inter h-[36px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm mt-3 sm:my-0"
                            >
                              Reset Password
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
                {showExplain && (
          <div className="font-Mulish bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl">
            <div className="flex">
              <div
                className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                onClick={handleBackDescribeClick}
              >
                <img src={ArrowLeft} alt="" className="cursor-pointer" />
              </div>
              <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                Back
              </p>
            </div>
            <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
              Forgot Password
              <p className="text-xs font-Inter text-[#9A9AB0] my-3">
                Enter the email address you used when you joined and we’llsend
                you instructions to reset your password. <br />
                <br />
                For security reasons, we do NOT store your password. So rest
                assured that we will never send your password via email.
              </p>
              <p className="font-Mulish text-xs font-bold my-5">
                Enter OTP Sent Via Email
              </p>
              <div className="flex justify-center items-center sm:gap-3 gap-2 mb-3">
                <input
                  ref={pin1Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin1Ref, e.target.value, pin2Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin1Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin2Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin2Ref, e.target.value, pin3Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin2Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin3Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin3Ref, e.target.value, pin4Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin3Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin4Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin4Ref, e.target.value, pin5Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin4Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin5Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) =>
                    handleInputChange(pin5Ref, e.target.value, pin6Ref)
                  }
                  onKeyDown={(e) => handleKeyDown(pin5Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
                <input
                  ref={pin6Ref}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  onChange={(e) => handleInputChange(pin6Ref, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(pin6Ref, e)}
                  className="sm:text-xl text-xs sm:w-10 w-8 border-b-1 focus:border-b-1 focus:border-[#11142D] border-[#11142D] border-t-transparent border-l-transparent border-r-transparent
                focus:border-t-transparent focus:border-l-transparent focus:border-r-transparent text-center focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-[100px] font-Inter h-[36px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-5"
                onClick={handleVerifyClick}
              >
                Verify
              </button>
            </div>
          </div>
        )}
                {showResetPassword && (
          <div className="bg-white sm:w-[420px] sm:h-[470px] w-[270px] h-[500px] rounded-xl font-Mulish">
            <div className="flex">
              <div
                className="sm:ml-16 mt-6 sm:mb-0 mb-4 ml-8 rounded-sm bg-gradient-to-b bg-white hover:bg-[#E1E1E1] border border-[#E1E1E1]"
                onClick={handleBackToExplain}
              >
                <img src={ArrowLeft} alt="" className="cursor-pointer" />
              </div>
              <p className="ml-2 mt-[26.5px] font-Mulish text-sm font-semibold">
                Back
              </p>
            </div>
            <div className="sm:my-7 sm:mx-16 my-2 mx-8 font-Inter text-lg">
              Reset Password
              <div>
                <Formik
                  initialValues={{
                    newPassword: "",
                    confirmNewPassword: "",
                  }}
                  validationSchema={Yup.object({
                    newPassword: Yup.string()
                      .min(8, "Must be 8 characters or more")
                      .required("Required"),
                    confirmNewPassword: Yup.string()
                      .oneOf(
                        [Yup.ref("newPassword"), null],
                        "Passwords must match"
                      )
                      .required("Required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    // Handle form submission logic here
                    // Remember to call setSubmitting(false) when done
                  }}
                >
                  {(formik) => (
                    <form
                      className="flex flex-col items-center gap-4 mt-4"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">
                          New Password
                        </p>
                        <div className="relative flex">
                          <input
                            type={newPassword ? "password" : "text"}
                            placeholder="Set new password"
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.loginPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {newPassword ? (
                              <FiEye onClick={toggleNewPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleNewPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.newPassword &&
                        formik.errors.newPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.newPassword}
                          </div>
                        ) : null}
                      </div>
                      <div className="font-Mulish sm:w-[300px] w-[200px]">
                        <p className="pb-1 text-xs font-semibold">
                          Confirm Password
                        </p>
                        <div className="relative flex">
                          <input
                            type={confirmNewPassword ? "password" : "text"}
                            placeholder="Confirm password"
                            name="confirmNewPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmNewPassword}
                             className="w-72 h-9 border border-gray-400 px-2 rounded-lg sm:text-xs text-[11px] focus:outline-none focus:ring-0 transition"
                          />
                          <div className="absolute text-sm right-[20px] top-[11px] text-[#6C6C6C] cursor-pointer">
                            {confirmNewPassword ? (
                              <FiEye onClick={toggleConfirmNewPassword} />
                            ) : (
                              <FiEyeOff onClick={toggleConfirmNewPassword} />
                            )}
                          </div>
                        </div>
                        {formik.touched.confirmNewPassword &&
                        formik.errors.confirmNewPassword ? (
                          <div className="text-red-700 text-xs">
                            {formik.errors.confirmNewPassword}
                          </div>
                        ) : null}
                      </div>
                    </form>
                  )}
                  <div className="flex flex-col items-center my-10">
                    <button
                      type="submit"
                      className="w-[200px] font-Inter h-[33px] bg-[#4E43FA] hover:bg-gradient-to-r from-orange to-yellow rounded-lg text-white text-sm my-3 sm:my-0"
                    >
                      Reset
                    </button>
                  </div>
                </Formik>
              </div>
            </div>
          </div>
        )}
    </Fragment>
  )
}

export default page