import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h4 className='text-center'>
          <FaUser /> Log In
        </h4>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>
            Don't have an account? <Link href='/account/register'>
                Register
            </Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
