import React from 'react';
import './Navbar.scss';
import { NavHome } from '../../assets/img';
import { NavMeditate } from '../../assets/img';
import { NavMoon } from '../../assets/img';
import { NavMusic } from '../../assets/img';
import { NavProfile } from '../../assets/img';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <article className='navBarArticle'>
            <nav className='navBarNav'>
                <Link className='navBarLink'>
                    <div className='navBarDiv'>
                        <img className='navBarImg' src={NavMoon} alt='Moon Icon'></img>
                        <p className='navBarParagraph'>Yoga</p>
                    </div>
                </Link>

                <Link className='navBarLink'>
                    <div className='navBarDiv'>
                        <img className='navBarImg' src={NavMeditate} alt='Meditate Icon'></img>
                        <p className='navBarParagraph'>Meditate</p>
                    </div>
                </Link>

                <Link className='navBarLink'>
                    <div className='navBarDiv'>
                        <img className='navBarImg' src={NavHome} alt='Home Icon'></img>
                        <p className='navBarParagraph'>Home</p>
                    </div>
                </Link>

                <Link className='navBarLink'>
                    <div className='navBarDiv'>
                        <img className='navBarImg' src={NavMusic} alt='Music Icon'></img>
                        <p className='navBarParagraph'>Music</p>
                    </div>
                </Link>

                <Link className='navBarLink'>
                    <div className='navBarDiv'>
                        <img className='navBarImg' src={NavProfile} alt='Profile Icon'></img>
                        <p className='navBarParagraph'>Name</p>
                    </div>
                </Link>
            </nav>
        </article>
    )
}

export default Navbar
