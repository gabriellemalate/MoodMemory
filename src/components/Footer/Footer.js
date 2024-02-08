import './Footer.scss';

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
                        <img src="" alt="LinkedIn" />
                    </a>
                </article>
            </section>
        </>
    )
}

export default Footer;