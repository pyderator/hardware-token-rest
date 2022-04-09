import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ProductService } from "../../../services/product";
import { BaseLayout } from "../../layout/base";

const AddProductKey = () => {
  const router = useRouter();
  const [productKey, setProductKey] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const productService = React.useRef(new ProductService());
  React.useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      // router.replace("/login");
    }
  }, []);
  const addProductKey = async (e: any) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      if (productKey) {
        const response = await productService.current.addKey({
          productKey,
        });
        setSuccessMessage(response.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return setErrorMessage(err.response?.data.message);
      }

      return setErrorMessage((err as any).toString());
    }
  };

  const fetchProductKey = async (e: any) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      if (productKey) {
        const response = await productService.current.getKeyDetails({
          productKey,
        });
        console.log(response);
        setSuccessMessage(response);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return setErrorMessage(err.response?.data.message);
      }

      return setErrorMessage((err as any).toString());
    }
  };
  return (
    <BaseLayout>
      <Head>
        <title>Add Product Key</title>
      </Head>
      <div className="max-w-xl m-auto mt-20">
        <h1 className="text-center text-3xl font-semibold mb-5">Product Key</h1>
        <form>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="floating_product_key"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
            />
            <label
              htmlFor="floating_product_key"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Key
            </label>
          </div>
          {successMessage && (
            <div className="mb-6">
              <pre className="text-green-800 text-sm  overflow-scroll">
                {JSON.stringify(successMessage, undefined, 2)}
              </pre>
            </div>
          )}
          {errorMessage && errorMessage.length > 0 && (
            <div className="mb-6">
              <small className="text-red-800 text-sm">{errorMessage}</small>
            </div>
          )}
          <div className="w-40 flex items-center justify-between">
            <button
              type="submit"
              onClick={addProductKey}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>

            <button
              type="submit"
              onClick={fetchProductKey}
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Fetch
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default AddProductKey;
