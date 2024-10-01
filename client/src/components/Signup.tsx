import Button from "./Button";
import Input from "./Input";

export default function Signup() {
    return(
    <>
        <div className="bg-slate-400 h-screen  flex flex-col justify-center items-center ">
            <div className="font-semibold text-5xl pb-3" >
                Signup
            </div>
            <div className="rounded-2xl border-2 h-[500px] w-[400px] border-blue-900 flex flex-col justify-center items-center bg-white">
            
            <Input label="First Name" placeholder="Peter "></Input>
            <Input label="Last Name " placeholder="Griffin"></Input>
            <Input label="Email" placeholder="aryan@mail.com"></Input>
            <Input label="Username" placeholder="username"></Input>
            <Input label="Password" placeholder="password"></Input>
            <Button ></Button>
            </div>

        </div>
    </>
    )
}