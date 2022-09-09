import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  const phoneRegExp =
    /^((\\0[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  //const dateRegExp = /^[0-9]{4}[0-9]{2}[0-9]{2}/;

  const validate = Yup.object({
    username: Yup.string()
      .max(10, "نام حداکثر می تواند شامل ده کاراکتر باشد. ")
      .min(3, "نام حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    lastName: Yup.string()
      .max(20, "نام خانوادگی حداکثر می تواند شامل 20 کاراکتر باشد.")
      .min(3, "نام خانوادگی حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    address: Yup.string()
      .max(120, "آدرس حداکثر می تواند شامل 20 کاراکتر باشد.")
      .min(3, " آدرس حداقل باید شامل بیشتر از دو کاراکتر باشد.")
      .required("این قسمت نمی تواند خالی باشد"),
    phone: Yup.string()
      .max(12, "حداکثر ارقام 12 می باشد")
      .min(8, "حداقل باید شامل هشت رقم باشد.")
      .matches(phoneRegExp, "شماره ی وارد شده صحیح نمی باشد!")
      .required("این قسمت نمی تواند خالی باشد"),
    expectAt: Yup.string().required("این قسمت نمی تواند خالی باشد"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // let obj = {
    //   username: data.get("username"),
    //   lastName: data.get("lastName"),
    //   address: data.get("address"),
    //   phone: data.get("phone"),
    //   expectAt: parseInt(
    //     (new Date(data.get("expectAt")).getTime() / 1000).toFixed(0)
    //   ),
    // };

    // localStorage.setItem("formInput", JSON.stringify(obj));
    // navigate("//localhost:3005");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        lastName: "",
        address: "",
        phone: "",
        expectAt: "",
      }}
      validationSchema={validate}
      // onSubmit: (values) => {
      //   alert(`اطلاعات ${JSON.stringify(values)} با موفقیت ثبت شد`);
      // },
      onSubmit={() => {
        alert(`.اطلاعات شما با موفقیت ثبت شد`);
      }}
    >
      {(formik) => (
        <div dir="rtl" style={{ marginRight: "15px" }} className="mb-5">
          <h1 className="my-4 font-weight-bold .display-4">
            نهایی کردن سبد خرید
          </h1>
          <Form onSubmit={handleSubmit}>
            <TextField
              label="نام:"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <TextField label="نام خانوادگی: " name="lastName" type="text" />
            <TextField
              label="آدرس:"
              name="address"
              type="text"
              placeholder="شهر...منطقه...خیابان...پلاک..."
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <TextField
              label="تلفن همراه:"
              name="phone"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <TextField
              label="تاریخ تحویل:"
              name="expectAt"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.expectAt}
            />
            <button className="btn btn-dark mt-3" type="submit">
              پرداخت
            </button>
            <button className="btn btn-danger mt-3 ml-3" type="reset">
              پاک کردن
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
