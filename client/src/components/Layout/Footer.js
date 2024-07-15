import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <h4 className='text-center'>
                Todos los derechos reservados &copy; Albán Richard - Lazo Ricardo - Nasimba Jorge - Zurita Vanessa
            </h4>
            <p className='text-center mt-3'>
                <Link to="/about">Sobre Nosotros</Link>
                <Link to="/contact">Contactos</Link>
                <Link to="/policy">Politicas de Privacidad</Link>
            </p>
        </div>
    )
}

export default Footer
