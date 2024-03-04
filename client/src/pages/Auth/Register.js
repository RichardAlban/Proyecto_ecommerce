import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo Salio mal");
    }
  };
  return (
    <Layout title="Register - Ecommerce App">
        <div className="form-container ">
            <form onSubmit={handleSubmit}>
            <h4 className="title">Registro de Usuario</h4>
                <div className="mb-3">
                    <input type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1"
                    placeholder='Ingresa tu nombre' 
                    required
                    />
                </div>

                <div className="mb-3">
                    <input type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder='Ingresa un email'
                    required
                    />
                    
                </div>

                <div className="mb-3">               
                    <input type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder='Ingresa una contraseña'
                    required
                    />
                    
                </div>

                <div className="mb-3">
                    
                    <input type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder='Enter Your Phone'
                    required
                    />
                </div>

                <div className="mb-3">                  
                    <input type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder='Ingresa tu dirección'
                    required
                    />
                </div>

                <div className="mb-3">
                  <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Cual es tu deporte favorito"
                  required
                  />
                </div>
                    <button type="submit" className="btn btn-primary">Registro</button>
            </form>
        </div>

    </Layout>
  )
}

export default Register