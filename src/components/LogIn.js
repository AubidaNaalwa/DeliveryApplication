import React, { useState } from "react";
import '../styles/logIn.css'
import axios from "axios";
import { observer, inject } from 'mobx-react'
import Orders from './Orders'

function LogIn(props) {
    const [input, setInput] = useState({ userName: "", password: "" })

    const logIn = async function () {
        const isLogIn = await axios.post('/logIn', input)
        props.ordersStore.login(isLogIn.data.status, input);
    }

    const signUpFirstStep = function () {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    
    const signInFirstStep = function () {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }
    

    return (
        <div>
            {props.ordersStore.islogIn ? <Orders /> :
                <div>
                    <div class="container" id="container">
                       
                        <div class="form-container sign-in-container">
                            <div className='formToDiv' action="#">
                                <h1>Sign in</h1>
                                <div class="social-container">
                                </div>
                                <input type="email" placeholder="User Name" value={input.userName} onChange={(e)=>setInput({userName : e.target.value, password : input.password })} />
                                <input type="password" placeholder="Password" value={input.password} onChange={(e)=>setInput({userName: input.userName, password : e.target.value})}  />
                                <div class="social-container">
                                </div>
                                <button onClick={logIn}>Sign in</button>

                            </div>
                        </div>
                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button onClick={signInFirstStep} class="ghost" id="signIn">Sign In</button>
                                </div>
                                <div class="overlay-panel overlay-right">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button onClick={signUpFirstStep} class="ghost" id="signIn">Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            }
        </div>

    );
}
export default inject("ordersStore")(observer(LogIn))