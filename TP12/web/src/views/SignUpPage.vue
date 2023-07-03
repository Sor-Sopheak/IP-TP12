<template>
    <div class="wrapper">
      <div class="header">
        <h1>Admin dashboard</h1>
        <h1>លេខមួយ.com</h1>
      </div>
      <div class="signUpPage">
        <h3>Sign Up</h3>
        <p>Please fill in this form to create an account.</p>
        <hr/>
        <form @submit.prevent="signUp">
            <div class="txt_field">
                <input type="email" v-model="email" name="email" required>
                <span></span>
                <label>Email</label>
            </div>
            <div class="txt_field">
                <input type="text" v-model="username" name="username" required>
                <span></span>
                <label>Username</label>
            </div>
            <div class="txt_field">
                <input type="text" v-model="firstname" name="firstname" required>
                <span></span>
                <label>First name</label>
            </div>
            <div class="txt_field">
                <input type="text" v-model="lastname" name="lastname" required>
                <span></span>
                <label>Last name</label>
            </div>
            <div class="txt_field">
                <input type="password" v-model="password" required>
                <span></span>
                <label>Password</label>
            </div>
            <div class="txt_field">
                <input type="password" v-model="repeat_password" required>
                <span></span>
                <label>Repeat Password</label>
            </div>
            <div class="pass">Forgot Password?</div>
            <input type="submit" value="Sign Up">
            <div class="loginnow">
                <span>Already have account?</span>
                <span href="" class="pass">
                    <router-link to="/auth/login">
                        Login now
                    </router-link>
                </span>
            </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>

    export default {
        data() {
            return {
                email: '',
                username: '',
                firstname: '',
                lastname: '',
                password: '',
                repeat_password: '',
            };
        },

        methods: {
            signUp() {
                const data = {
                    email: this.email,
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    password: this.password,
                    repeat_password: this.repeat_password,
                };

                fetch('http://localhost:3000/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(data => {
                    console.log(data);
                    if (data.ok) {
                        alert("Successfully registered!!");
                        this.$router.push({ name: "dashboard" });
                    } else {
                        throw new Error('SignUp failed'); 
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

    .signUpPage{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        background: white;
        border-radius: 10px;
        box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
    }

    .signUpPage h3{
        text-align: center;
        font-size: 23px;
    }

    .signUpPage p{
        margin-top: 5px;
        font-size: 14px;
        text-align: center;
        color:#6d6d6d;
    }

    form{
        padding: 0 20px;
        box-sizing: border-box;
    }

    form .txt_field{
        position: relative;
        border-bottom: 2px solid #adadad;
        margin: 20px 0;
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
        font-size: 14px;
    }
    .pass:hover{
        text-decoration: underline;
        color: #2691d9;
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

    .loginnow {
        text-align: center;
        margin-bottom: 7px;
    }

    .loginnow span{
        color: #6d6d6d;
        font-size: 14px;
    }

    .loginnow a {
        color: #2691d9;
    }
  </style>
  
  
  