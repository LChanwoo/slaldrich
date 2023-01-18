import InputGroup from "../../components/InputGroup";
import { useState } from "react";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [errors, setErrors] = useState<any>({});
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("username: ", username);
        // console
    };
    
    return (
        <div className="flex flex-col w-96 h-screen justify-center items-center m-auto">
        <form onSubmit={handleSubmit} >
        <h1>회원가입</h1>
            <InputGroup
              placeholder="email"
              value={username}
              setValue={setUsername}
              error={errors.username}
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