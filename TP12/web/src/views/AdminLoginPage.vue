<template>
    <div class="wrapper">
      <div class="header">
        <h1>Admin dashboard</h1>
        <h1>លេខមួយ.com</h1>
      </div>
      <div class="loginpage">
        <h3>Admin</h3>
        <form @submit.prevent="login">
            <div class="txt_field">
                <input type="text" v-model="username" required>
                <span></span>
                <label>Username</label>
            </div>
            <div class="txt_field">
                <input type="password" v-model="password" required>
                <span></span>
                <label>Password</label>
            </div>
            <div class="pass">Forgot Password?</div>
            <input type="submit" value="Login">
        </form>
      </div>
    </div>
  </template>
  
  <script>

    export default {
        data() {
            return {
                username: '',
                password: '',
            };
        },

        methods: {
            login() {
                const data = {
                    username: this.username,
                    password: this.password,
                };

                fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res=> {
                    if(res.status<200 || res.status>=300) {
                        throw new Error('Login failed');
                    } 
                    return res.json();
                })
                .then(data => {
                    if (data.success) {
                        localStorage.setItem("token", data.token);
                        this.$router.push({ name: "dashboard" });
                    } else {
                        throw new Error('Login failed'); 
                    }
                })
                .catch(error => {
                    console.error(error);
                })

            }
        }
    }
  </script>
    
  <style>
  
    body{
      margin: 0;
      padding: 0;
    }
  
    .wrapper {
      margin: auto;
      width: 90%;
      height: 100vh;
      overflow-y: auto;
      border: 2px solid gray;
    }
  
    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 2px gray solid;
      height: 50px;
    }

    .loginpage{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background: white;
        border-radius: 10px;
        box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
    }

    .loginpage h3{
        text-align: center;
        padding: 20px 0;
        border-bottom: 1px solid silver;
        font-size: 23px;
    }

    form{
        padding: 0 20px;
        box-sizing: border-box;
    }

    form .txt_field{
        position: relative;
        border-bottom: 2px solid #adadad;
        margin: 30px 0;
    }

    .txt_field input{
        width: 100%;
        padding: 0 5px;
        height: 40px;
        font-size: 16px;
        border: none;
        background: none;
        outline: none;
    }

    .txt_field label{
        position: absolute;
        top: 50%;
        left: 5px;
        color: #adadad;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        transition: .5s;
    }

    .txt_field span::before{
        content: '';
        position: absolute;
        top: 40px;
        left: 0;
        width: 0%;
        height: 2px;
        background: #2691d9;
        transition: .5s;
    }
    .txt_field input:focus ~ label,
    .txt_field input:valid ~ label{
        top: -5px;
        color: #2691d9;
    }
    .txt_field input:focus ~ span::before,
    .txt_field input:valid ~ span::before{
        width: 100%;
    }

    .pass{
        margin: -5px 0 20px 5px;
        color: #a6a6a6;
        cursor: pointer;
    }
    .pass:hover{
        text-decoration: underline;
    }
    input[type="submit"]{
        width: 100%;
        height: 40px;
        border: 1px solid;
        background: #2691d9;
        border-radius: 25px;
        font-size: 18px;
        color: #e9f4fb;
        font-weight: 700;
        cursor: pointer;
        outline: none;
        margin-bottom: 15px;
    }
    input[type="submit"]:hover{
        background-color: #243ee7;
        transition: .5s;
    }
  </style>
  
  
  