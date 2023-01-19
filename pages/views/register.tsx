import InputGroup from "../../components/InputGroup";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [errors, setErrors] = useState<any>({});
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const nickname = "test"+ Math.floor(Math.random() * 9999);
        
        axios
        .post('/api/users', { email, nickname, password })
        .then(() => {
            // alert("회원가입이 완료되었습니다.")
            Router.push('/login');
        })
        .catch((error) => {
            setErrors(error.response.data);
        }); 

    };
    
    return (
        <div className="flex flex-col w-96 h-screen justify-center items-center m-auto">
        <form onSubmit={handleSubmit} >
        <h1>회원가입</h1>
            <InputGroup
              placeholder="email"
              value={email}
              setValue={setEmail}
              error={errors.email}
            ></InputGroup>
            <InputGroup
                placeholder="Password"
                value={password}
                setValue={setPassword}
                error={errors.password}
            ></InputGroup>
            <InputGroup
                placeholder="Password Check"
                value={passwordCheck}
                setValue={setPasswordCheck}
                error={errors.passwordCheck}
            ></InputGroup>
            <button className="py-2 mb-1  w-full p-3 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded"> 회원가입</button>
        </form>
        </div>
    );
};

export default RegisterPage;