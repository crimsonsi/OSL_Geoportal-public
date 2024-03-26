import { useEffect, useRef } from "react";

import logo from "../../assets/imgs/Logo-accent.png";
export default function CoolText(props) {
  const txt1 = useRef();
  const txt2 = useRef();

  const texts = ["Data", "Hub"];

  useEffect(() => {
    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    txt1.current.textContent = texts[textIndex % texts.length];
    txt2.current.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction) {
      txt2.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      txt2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      txt1.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      txt1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      txt1.current.textContent = texts[textIndex % texts.length];
      txt2.current.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      txt2.current.style.filter = "";
      txt2.current.style.opacity = "100%";

      txt1.current.style.filter = "";
      txt1.current.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();
  }, []);

  return (
    <div className="cool_text">
      <div className="container">
        <span className="text1" ref={txt1}></span>
        <span className="text2" ref={txt2}></span>
      </div>

      <svg id="filters">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
