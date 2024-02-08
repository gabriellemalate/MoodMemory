import './Footer.scss';
import LinkedIn from "../../assets/social-icons/LinkedIn.png"

function Footer() {
    return (
        <>
            <section className='contact-eq'>
                <h3 className='contact' onClick={() => window.location = 'mailto:yourmail@domain.com'}>
                    EMAIL
                    <i className='contact-name'> HelloMoodMemory</i>
                </h3>
                <article className='contact__socials'>
                    <a 
                    className='contact__socials-social'
                    href="https://www.linkedin.com/in/gabriellemalate/"
                    >
                        <img
                        src={LinkedIn} 
                        alt="LinkedIn" 
                        className='contact__socials-social-icon'/>
                    </a>
                </article>
            </section>
        </>
    )
}

export default Footer;