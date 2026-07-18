import './footer.css'

import { FaGithub, FaLinkedinIn, FaTwitter} from 'react-icons/fa'

function Footer(){


    return (
        <>
        <div className="footer">
            <div className="copy">&copy;LetYouWatchThis 2026</div>
            <div className="social">
                <div className="github">
                    <a href="#"><FaGithub/></a>
                </div>
                <div className="linkend">
                    <a href="#"><FaLinkedinIn/></a>
                </div>
                <div className="X">
                    <a href="#"><FaTwitter/></a>
                </div>
            </div>
            <div className="text">
                <p>This Movie recommendation is designed by KL</p>
            </div>
        </div>
        
        </>
    )
}

export default Footer;