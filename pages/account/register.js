import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";

const RegisterPage = () => {
  const [username, setUsername]  = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const {register, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error))
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== passwordConfirm){
        toast.error('Passwords do not match');
        return;
    }

    register({username, email, password})
  };
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h4 className='text-center'>
          <FaUser /> Register
        </h4>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value="Register" className="btn" />
        </form>
        <p>
            Already have an account? <Link href='/account/login'>
                Login
            </Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
