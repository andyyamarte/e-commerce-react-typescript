import "./Hero.css";
import hero from "../../assets/hero.png";

export const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <p className="subtitle">NUESTROS BESTSELLERS</p>
        <h1 className="title">Últimas llegadas</h1>
        <p className="cta">COMPRA AHORA</p>
      </div>
      <div className="hero-image">
        <img src={hero} alt="" />
      </div>
    </section>
  );
};

export default Hero;
