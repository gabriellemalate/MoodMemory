import './Footer.scss';
import LinkedIn from "../../assets/social-icons/LinkedIn.png";
import Medium from "../../assets/social-icons/medium.png";
import Youtube from "../../assets/social-icons/youtube.svg";

function Footer() {
    return (
        <>
            <section className='contact-eq'>
                <h3 className='contact' onClick={() => window.location = 'mailto:yourmail@domain.com'}>
                    Contact
                    <i className='contact-name'> HelloMoodMemory</i>
                </h3>
                <article className='contact__socials'>
                    {/* <a 
                    className='contact__socials-social'
                    href="https://www.linkedin.com/in/gabriellemalate/"
                    >
                        <img
                        src={LinkedIn} 
                        alt="LinkedIn" 
                        className='contact__socials-social-icon'/>
                    </a> */}
                    <a 
                    className='contact__socials-social'
                    href="https://www.youtube.com/@gabriellemalate"
                    >
                        <img
                        src={Youtube} 
                        alt="Youtube" 
                        className='contact__socials-social-icon'/>
                    </a>
                    <a 
                    className='contact__socials-social'
                    href="https://medium.com/@gabriellemalate"
                    >
                        <img
                        src={Medium} 
                        alt="Blog" 
                        className='contact__socials-social-icon'/>
                    </a>
                </article>
            </section>
        </>
    )
}

export default Footer;