import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const InputForm = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event);
    if (event === "") {
      setNameError("وارد کردن نام کاربری ضروری است");
    } else if (event.length <= 2) {
      setNameError("نام کاربری نامعتبر است");
    } else {
      setNameError("");
    }
  };

  const handlePass = (event) => {
    setPass(event);
    if (event.length < 4) {
      setPassError("تعداد کاراکتر پسورد وارد شده کم است");
    } else {
      setPassError("");
    }
  };

  const isValid =
    passError === "" && nameError === "" && name !== "" && pass !== "";

  return (
    <div className=" w-100 h-100">
      <form
        dir="rtl"
        style={{ margin: "70px 320px" }}
        className=" bg-light border border-3 g-3  w-50 p-5"
      >
        <div class="form-group">
          <h4>ورود به پنل مدیریت فروشگاه الی شاپ</h4>
          <label for="nameInput">نام کاربری:</label>
          <br />
          <input
            type="text"
            className="form-control w-50"
            id="nameInput"
            aria-describedby="emailHelp"
            placeholder="*نام کاربری را وارد نمایید"
            onChange={(event) => {
              handleName(event.target.value);
            }}
          />
          <p style={{ color: "red", margin: "10px 0px" }}>{nameError}</p>
        </div>
        <div class="form-group">
          <label for="passwordInput">رمز عبور:</label>
          <br />
          <input
            type="password"
            className="form-control w-50"
            id="passwordInput"
            placeholder="*رمز عبور راوارد نمایید"
            onChange={(event) => {
              handlePass(event.target.value);
            }}
          />
          <p style={{ color: "red", margin: "10px 0px" }}>{passError}</p>
        </div>

        <button
          type="submit"
          class="enter"
          disabled={!isValid}
          onClick={() => navigate("panel")}
        >
          ورود
        </button>
        <button
          type="button"
          class="btn btn-link"
          onClick={() => navigate("/")}
        >
          بازگشت به سایت
        </button>
      </form>
    </div>
  );
};
