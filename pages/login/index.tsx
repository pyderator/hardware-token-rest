import axios from "axios";
import Head from "next/head";
import React from "react";
import { UserService } from "../../services/user";
import { BaseLayout } from "../layout/base";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passcode, setPassCode] = React.useState<number>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const userService = React.useRef(new UserService());

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (email && passcode && password) {
        const response = await userService.current.login({
          code: passcode,
          email,
          password,
        });
        localStorage.setItem("token", response.token);
        setSuccessMessage(response.message);
        setErrorMessage("");
        setPassCode(0);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setSuccessMessage("");
      if (axios.isAxiosError(err)) {
        return setErrorMessage(err.response?.data.message);
      }
      setErrorMessage((err as any).toString());
    }
  };

  return (
    <BaseLayout>
      <Head>
        <title>Login</title>
      </Head>
      <div className="max-w-xl m-auto mt-20">
        <h1 className="text-center text-3xl font-semibold mb-5">Login</h1>
        <form onSubmit={submitForm}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="pass_code"
              id="pass_code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={passcode}
              onChange={(e) => setPassCode(Number(e.target.value))}
            />
            <label
              htmlFor="pass_code"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pass Code
            </label>
          </div>
          {successMessage && successMessage.length > 0 && (
            <div className="mb-6">
              <small className="text-green-800 text-sm">{successMessage}</small>
            </div>
          )}
          {errorMessage && errorMessage.length > 0 && (
            <div className="mb-6">
              <small className="text-red-800 text-sm">{errorMessage}</small>
            </div>
          )}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </BaseLayout>
  );
};

export default Login;
