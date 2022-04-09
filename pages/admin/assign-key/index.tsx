import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { ProductService } from "../../../services/product";
import { UserService } from "../../../services/user";
import { BaseLayout } from "../../layout/base";

interface IProductKey {
  productKey: string;
  id: string;
}
interface IUser {
  email: string;
  id: string;
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const AssignProductKey = () => {
  const router = useRouter();
  const [productKeys, setProductKeys] = React.useState<Array<IProductKey>>([]);
  const [users, setUsers] = React.useState<Array<IUser>>([]);
  const [productKey, setProductKey] = React.useState<string>();
  const [user, setUser] = React.useState<string>();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [productKeyLoadingError, setProductKeyLoadingError] =
    React.useState("");
  const [usersLoadingError, setUsersLoadingError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const productService = React.useRef(new ProductService());
  const userService = React.useRef(new UserService());

  const fetchUnassignedProducts = async () => {
    try {
      const response = await productService.current.getUnassignedKeys();
      setProductKeys(response.productKeys);
    } catch (err) {
      setProductKeyLoadingError((err as any).toString());
    }
  };

  const fetchUnassignedUsers = async () => {
    try {
      const response = await userService.current.getUnassignedUsers();
      setUsers(response.users);
    } catch (err) {
      setProductKeyLoadingError((err as any).toString());
    }
  };

  React.useEffect(() => {
    Promise.all([fetchUnassignedProducts(), fetchUnassignedUsers()]);
  }, []);

  React.useEffect(() => {
    users && users.length > 0 && setUser(users[0].id);
    productKeys && productKeys.length > 0 && setProductKey(productKeys[0].id);
  }, [users, productKeys]);

  const submitForm = async (e: any) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      if (productKey && user) {
        const response = await userService.current.assignKeyToUser({
          tokenId: productKey,
          userId: user,
        });
        setSuccessMessage(response.message);
        Promise.all([fetchUnassignedProducts(), fetchUnassignedUsers()]);
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
        <title>Assign product key</title>
      </Head>
      <div className="max-w-xl m-auto mt-20">
        <form onSubmit={submitForm}>
          <h1 className="text-center text-3xl font-semibold mb-5">
            Assign Product Key
          </h1>
          <div>
            <label
              id="listbox-label"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product Key
            </label>
            <select
              className="mb-6 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onChange={(e) => setProductKey(e.target.value)}
              value={productKey}
              defaultChecked={false}
            >
              {productKeys && productKeys.length > 0 ? (
                productKeys.map((productKey) => (
                  <option key={productKey.id} value={productKey.id}>
                    {productKey.productKey}
                  </option>
                ))
              ) : (
                <option disabled>No product keys</option>
              )}
            </select>
          </div>
          <div>
            <label
              id="listbox-label"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User
            </label>
            <select
              className=" mb-6 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              defaultChecked={false}
            >
              {users && users.length > 0 ? (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))
              ) : (
                <option disabled>No users</option>
              )}
            </select>
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
              onClick={submitForm}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </BaseLayout>
  );
};

export default AssignProductKey;
