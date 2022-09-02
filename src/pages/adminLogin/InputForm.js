//import { useDeprecatedAnimatedState } from "framer-motion";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../redux/userSlice/usersSlice";

export const InputForm = () => {
  // const [name, setName] = useState("");
  // const [nameError, setNameError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  // const [pass, setPass] = useState("");
  // const [passError, setPassError] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*************RegExp for password login */
  const re = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
  );
  /***************** Inputs Validation *************************/
  const handleUserName = (event) => {
    setUsername(event.target.value);
    if (/\d/.test(username)) {
      setUsernameErr(".نام نباید شامل اعداد باشد");
    } else if (event.target.value === "") {
      setUsernameErr("وارد کردن نام کاربری ضروری است");
    } else if (event.target.value.length <= 2) {
      setUsernameErr("طول نام کاربری باید بزرگتر از دو کاراکتر باشد.");
    } else {
      setUsernameErr("");
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);

    // if (!re.test(password)) {
    //   setPasswordErr(
    //     "رمز عبور باید شامل حروف بزرگ، کوچک، اعداد، کاراکتر خاص و حداقل شامل 8 کاراکتر باشد."
    //   );
    // }

    if (event.target.value.length <= 2) {
      setPasswordErr("طول رمز عبور باید بزرگتر از دو کاراکتر باشد.");
    } else if (event.target.value === "") {
      setPasswordErr("وارد کردن رمز عبور ضروری است");
    } else {
      setPasswordErr("");
    }
  };
  /***************** error  *************************/
  const { error, isLoggedIn } = useSelector((state) => state.users);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    console.log(login);
  };

  if (isLoggedIn) return <Navigate to={"/panel"} />;
  else {
    <Navigate to={"/login"} />;
  }
  // const isValid =
  //   passError === "" && nameError === "" && name !== "" && pass !== "";
  const isValid = username !== "" && password !== "";
  return (
    <div className=" w-100 h-100">
      <form
        onSubmit={(event) => handleSubmit(event)}
        dir="rtl"
        style={{ margin: "70px 320px", lineHeight: "30px" }}
        className=" bg-light border border-3 g-3  w-50 p-5"
      >
        {error && <h5>{error}</h5>}
        <div className="form-group">
          <h4>ورود به پنل مدیریت فروشگاه الی شاپ</h4>
          <label for="nameInput">نام کاربری:</label>
          <br />
          <input
            type="text"
            value={username}
            className="form-control w-50"
            id="nameInput"
            aria-describedby="emailHelp"
            placeholder="*نام کاربری را وارد نمایید"
            onChange={(event) => {
              handleUserName(event);
            }}
          />
          <p style={{ color: "red", margin: "10px 0px" }}>{usernameErr}</p>
        </div>
        <div className="form-group">
          <label for="passwordInput">رمز عبور:</label>
          <br />
          <input
            value={password}
            type="password"
            className="form-control w-50"
            id="passwordInput"
            placeholder="*رمز عبور راوارد نمایید"
            onChange={(event) => {
              handlePassword(event);
            }}
          />
          <p style={{ color: "red", margin: "10px 0px" }}>{passwordErr}</p>
        </div>

        <button
          type="submit"
          className="enter"
          disabled={!isValid}
          //onClick={() => navigate("panel")}
        >
          ورود
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate("/")}
        >
          بازگشت به سایت
        </button>
      </form>
    </div>
  );
};
