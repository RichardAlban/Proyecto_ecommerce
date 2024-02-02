import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={"Sobre Nosotros"}>
            <div className="row contactus ">
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">SOBRE NOSOSTROS</h1>
                <p className="text-justify mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                    officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                    perferendis eius temporibus dicta blanditiis doloremque explicabo
                    quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                    accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                    commodi illum quidem neque tempora nam.
                </p>
                </div>

                <div className="col-md-6 ">
                <img
                    src="https://www.ionos.es/digitalguide/fileadmin/DigitalGuide/Teaser/ueber-uns-t.jpg"
                    alt="GIF"
                    style={{ width: '100%', float: 'right' }}
                />
                </div>
            </div>
        </Layout>
    );
};

Layout.defaultProps ={
    title: "Shopping",
    description: "Proyecto MERN Stack",
    keywords: "mern, react, node, mongodb",
    author:"Alban Richard, Ipiales Carlos, Lazo Ricardo"
}

export default About;