import './Hero.css';
import { parrot } from '../../assets';

function Hero() {
    return (
        <div className="hero">
            <img className="hero__image" src={parrot} />
            <div className="hero-text">
                <h1 className="hero-text__title">PollyGlot</h1>
                <span className="hero-text__subtext">Perfect Translation Every Time</span>
            </div>
        </div>
    )
}

export default Hero;