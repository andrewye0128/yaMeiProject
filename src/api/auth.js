//使用套件
// import axios from "axios";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
// import Swal from "sweetalert2";

// 共同路徑
const authURL = "http://localhost:3001";
let authToken = ''
let userInfo = []

// 抓取節點
const signForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const adminLoginForm = document.querySelector("#adminLogin-form");
const loginName = document.querySelector("#login-name");
// const signEmailInput = document.querySelector("#signup-email");
// const signPasswordInput = document.querySelector("#signup-password");
// const signCheckPasswordInput = document.querySelector("#signup-checkPassword");
// const signNameInput = document.querySelector("#signup-name");
// const signPhoneInput = document.querySelector("#signup-phone");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const checkPasswordInput = document.querySelector("#checkPassword");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");

// 註冊功能
// const signUp = async () => {

//   try {
//     const response = await axios.post(`${authURL}/signup`, {
//       email: signEmailInput.value,
//       password: signPasswordInput.value,
//       checkPawword: signCheckPasswordInput.value,
//       name: signNameInput.value,
//       phone: signPhoneInput.value,
//       role: "user",
//     });

//     console.log("註冊成功");
//     console.log(response.data);

//     Swal.fire({
//       position: "top",
//       title: "註冊成功！即可登入",
//       timer: 1000,
//       icon: "success",
//       showConfirmButton: false,
//     });

//   } catch (error) {
//     console.log("註冊失敗");
//     console.error("signUp:", error);

//     // email 重複註冊
//     if (error.response.data === "Email already exists") {
//       Swal.fire({
//         icon: "error",
//         title: "註冊失敗",
//         text: "『email』已重複註冊，請重新輸入",
//       });
//       return
//     }
//   }
// };

// 註冊功能 測試
const signUp = async () => {
  try {
    const response = await axios.post(`${authURL}/signup`, {
      email: emailInput.value,
      password: passwordInput.value,
      checkPawword: checkPasswordInput.value,
      name: nameInput.value,
      phone: phoneInput.value,
      role: "user",
    });

    console.log("註冊成功");
    console.log(response.data);

    setTimeout(
      'location.assign("/yaMeiProject//src/pages/back/login.html")',
      1500
    );

    Swal.fire({
      position: "top",
      title: "註冊成功！即可登入",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });
    return
  } catch (error) {
    console.log("註冊失敗");
    console.error("signUp:", error);

    // email 重複註冊
    if (error.response.data === "Email already exists") {
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: "『email』已重複註冊，請重新輸入",
      });
      return;
    }
  }
};

// 登入功能
const login = async () => {
  try {
    const response = await axios.post(`${authURL}/login`, {
      email: emailInput.value,
      password: passwordInput.value,
    });

    console.log("登入成功");
    console.log(response.data);
    authToken = response.data.accessToken;
    if (authToken) {
      localStorage.setItem("authToken", authToken);

      userInfo.push(response.data.user);

      // 檢查 userInfo
      // console.log(userInfo[0].role);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    if (userInfo[0].role === "user" ) {
      setTimeout(() => {
        location.assign("/yaMeiProject//src/pages/front/index.html")
      }, 1500);

    }

      // 登入成功訊息
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });

    return

  } catch (error) {
    console.log("登入失敗");
    console.log("login:", error);
    Swal.fire({
      position: "top",
      title: "登入失敗！",
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
    return;
  }
};

// 登出功能
const logOut = () => {
  localStorage.removeItem("userInfo")
  localStorage.removeItem("authToken")
  loginName.innerHTML = `
        <span class="block absolute w-[82px] h-3 group-hover:bg-accent-100 top-4 z-[-1]"></span>
          <a href="../../pages/back/login.html">登入/註冊</a>
      `;
}

// 切換 登入/註冊 和 登出
const toggleLoginName = () => {
  // console.log(localStorage.getItem("userInfo"));

  if(localStorage.getItem("userInfo")) {
    let getUserData = JSON.parse(localStorage.getItem("userInfo"));

    if(getUserData[0].role === "user") {
      loginName.innerHTML = `
        <span class="block absolute w-[45px] h-3 group-hover:bg-accent-100 top-4 z-[-1]"></span>
          <a href="../../pages/back/login.html">登出</a>
      `;
      console.log(`已換成登出`)
    } else {
      loginName.innerHTML = `
        <span class="block absolute w-[90px] h-3 group-hover:bg-accent-100 top-4 z-[-1]"></span>
          <a href="../../pages/back/login.html">登入/註冊</a>
      `;
      console.log(`已換成登入/註冊`);
    }
  }
}


// 註冊觸及事件
const signAddEvent = () => {
  
  // 註冊事件
  // signForm.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   // 檢查一=> 輸入值是否為零
  //   if (
  //     signEmailInput.value.trim().length === 0 ||
  //     signPasswordInput.value.trim().length === 0 ||
  //     signCheckPasswordInput.value.trim().length === 0 ||
  //     signNameInput.value.trim().length === 0 ||
  //     signPhoneInput.value.trim().length === 0
  //   ) {
  //     console.log("沒有完整輸入");
  //     alert(`請輸入字，勿空白`);
  //     return;
  //   }
  //   // 檢查二 => 『密碼』和 『再輸入密碼』的值一樣
  //   if (signPasswordInput.value !== signCheckPasswordInput.value) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "註冊失敗",
  //       text: "輸入兩組密碼不相符，請再重新確認。",
  //     });
  //     return;
  //   }
  //   console.log("有完整輸入");
  //   // 按下註冊鈕
  //   signUp();
  // });

  // 註冊事件測試
  signForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 檢查一=> 輸入值是否為零
    if (
      emailInput.value.trim().length === 0 ||
      passwordInput.value.trim().length === 0 ||
      checkPasswordInput.value.trim().length === 0 ||
      nameInput.value.trim().length === 0 ||
      phoneInput.value.trim().length === 0
    ) {
      console.log("沒有完整輸入");

      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: "輸入框勿空白，請輸入字。",
      });
      return;
    }

    // 檢查二 => 『密碼』和 『再輸入密碼』的值一樣
    if (passwordInput.value !== checkPasswordInput.value) {
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: "輸入兩組密碼不相符，請再重新確認。",
      });
      return;
    }
    console.log("有完整輸入");
    // 按下註冊鈕
    signUp();
  });
};

// 登入觸及事件
const loginEvent = () => {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 檢查一=> 輸入值是否為零
    if (
      emailInput.value.trim().length === 0 ||
      passwordInput.value.trim().length === 0
    ) {
      console.log("沒有完整輸入");

      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: "輸入框勿空白，請輸入字。",
      });
      return
    }

    login()
  });
};

// authSign全部內容一次打包導出
// const authSigns = {
//   authURL,
//   signForm,
//   signEmailInput,
//   signPasswordInput,
//   signCheckPasswordInput,
//   signNameInput,
//   signPhoneInput,
//   signUp,
//   signAddEvent,
// };

export const authSigns = {
  authURL,
  signForm,
  emailInput,
  passwordInput,
  checkPasswordInput,
  nameInput,
  phoneInput,
  signUp,
  signAddEvent,
};

export const authLogins = {
  authURL,
  loginForm,
  emailInput,
  passwordInput,
  login,
  loginEvent,
};

export const authAdminLogins = {
  authURL,
  adminLoginForm,
  emailInput,
  passwordInput,
  login,
  loginEvent,
};

export const others = {
  loginName,
  logOut,
  toggleLoginName,
};