import { useContext, useState } from "react";
import Input from "../components/Input";
import SocialMedia from "../components/SocialMedia";
import { UserStatusContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPage = () => {

    const { isLoggedIn } = useContext(UserStatusContext);

    const navigate = useNavigate();

    const initialData = {
        email: "",
        password: "",
    };

    // state to store the data  of the user
    const [data, setData] = useState(initialData);


    // function to handle the form submit
    const handleFormSubmit = async (e) => {

        console.log("inside the from submit function");

        e.preventDefault();

        // api fetch 
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_CHAT_APP_URL}/api/login`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        console.log("the response of the api is:")
        console.log(res);

        //checking the response status
        if (res.status === 100) {
            toast.warn("all field are required", {
                position: "top-center",
                theme: "dark"
            });
        }
        else if (res.status === 404) {
            toast.warn("user not found", {
                position: "top-center",
                theme: "dark"
            })
        }
        else if (res.status === 401) {
            toast.info("invalid credentials", {
                position: "top-center",
                theme: "dark"
            })
        }
        else {
            const responseData = await res.json();
            console.log("the repsones of the data in json is:")
            console.log(responseData);
            console.log("the user is loggedIn successfully");

            if (isLoggedIn && responseData.user.token) {
                // Clear form data
                setData(initialData);

                localStorage.setItem("user-token", responseData.user.token);
                localStorage.setItem("user-details", JSON.stringify(responseData.user));
                navigate("/home");
                console.log("user loggedIn successfully");
                toast.success("user logged in successfully", {
                    position: "top-center",
                    theme: "dark",
                    hideProgressBar: true,
                    autoClose: 2000,

                })

            }
        }
    };


    return (
        <div className="h-screen w-full flex justify-center items-center  bg-[#FAF9F6]">
            <div className=" h-screen w-[400px] rounded-xl shadow-lg bg-white">

                <form className=" my-2 flex flex-col" onSubmit={handleFormSubmit}>

                    <h1 className="capitalize text-center my-6 font-bold text-lg">
                        log in to chatkro
                    </h1>



                    <p className="px-9 capitalize text-gray-400 my-5">
                        {" "}
                        welcome back ! sign in using your social account or email to
                        continue us
                    </p>


                    {isLoggedIn && (
                        <div className="flex items-center justify-center">
                            <SocialMedia />
                        </div>
                    )}

                    {isLoggedIn && (
                        <div className=" uppercase text-sm  flex items-center mt-10">
                            <hr className="w-44" />
                            <span className="px-2">or</span>
                            <hr className="w-44" />
                        </div>
                    )}



                    <Input
                        label="Your Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                        }}
                    />

                    <Input
                        label="Your Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                        }}
                    />

                    <button
                        type="submit"
                        className="my-3 w-3/4 py-2 mx-auto px-3 rounded-2xl bg-[#24786D] text-white capitalize active:bg-black active:text-white">
                        Log In
                    </button>

                </form>
            </div>
        </div>
    )
}

export default LoginPage