import { useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
    const [formType, setFormType] = useState('Login')

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })


    const history = useHistory();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post("/login", { email: formData.email, password: formData.password }, config);
        if (data) {
            history.push("/dashboard")
        }
    }

    return (
        <>
            <div className="h-screen w-screen grid grid-cols-2">
                <div className="bg-black flex flex-col items-center justify-center px-8">
                    <p className="text-center text-white text-bold text-6xl italic">
                        Code Online
                    </p>
                    <p className="text-center font-semibold text-3xl italic text-gray-400 mt-4">
                        "Online Code Editor for HTML, CSS, and JavaScript code Snippets"
                    </p>
                </div>
                <div className="">
                    {formType === "Login" ? <>
                        <form onSubmit={handleSubmit} className="w-full mt-72">
                            <p className="text-lg text-center my-8">
                                <span
                                    onClick={() => setFormType('Login')}
                                    className=""
                                >
                                    Login or,
                                </span>
                                <span
                                    onClick={() => setFormType('Signup')}
                                    className="text-blue-600 cursor-pointer"
                                >
                                    Sign up
                                </span>
                                <br />
                                <span
                                    onClick={() => { history.push("/editor") }}
                                    className="hover:text-blue-600 cursor-pointer"
                                >
                                    Guest Login
                                </span>
                            </p>
                            <div className="flex flex-col  items-center justify-center">
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    className="form-input w-3/5 rounded-md"
                                    placeholder="Enter your email"
                                    value={formData.email}

                                />
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="form-input w-3/5 mt-8 rounded-md"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                />
                                <button
                                    className="bg-black text-white font-semibold px-4 py-2.5 rounded-md mt-8 hover:bg-gray-700"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <p className="text-center font-semibold text-3xl fixed bottom-16">
                                    "Share live code and collaboarate with other developers"
                                </p>
                            </div>
                        </form>
                    </> :
                        <form onSubmit={handleSubmit} className="w-full mt-72">
                            <p className="text-lg text-center my-8">
                                <span
                                    onClick={() => setFormType('Login')}
                                    className="text-blue-600 cursor-pointer"
                                >
                                    Login or,
                                </span>
                                <span
                                    onClick={() => setFormType('Signup')}
                                >
                                    Sign up
                                </span>
                            </p>
                            <div className="flex flex-col  items-center justify-center">
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    className="form-input w-3/5 rounded-md"
                                    placeholder="Enter your email"
                                    value={formData.email}

                                />
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="form-input w-3/5 mt-8 rounded-md"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                />
                                <button
                                    className="bg-black text-white font-semibold px-4 py-2.5 rounded-md mt-8 hover:bg-gray-700"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                                <p className="text-center font-semibold text-3xl fixed bottom-16">
                                    "Share live code and collaboarate with other developers"
                                </p>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </>
    )
}

export default LoginScreen
