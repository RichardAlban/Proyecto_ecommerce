import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <Layout title={"Página no encontrada"}>
            <div className='pnf'>
                <h1 className="pnf-title"> Not Found 404</h1>
                <h2 className="pnf-heading"> Oops ! Página no encontrada</h2>
                <Link to="/" className="pnf-btn">
                    Volver atras
                </Link>
            </div>
            
        </Layout>
    )
}

export default Pagenotfound
