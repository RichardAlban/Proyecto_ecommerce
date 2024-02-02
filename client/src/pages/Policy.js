import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Politicas de Privacidad"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://i.pinimg.com/originals/7b/4c/3f/7b4c3f81fd933a924571d8c70024b018.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">POLITICA DE PRIVACIDAD</h1>
          <p>No estar rulay</p>
          <p>No ser de los choneros</p>
          <p>No ser tigretones</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;