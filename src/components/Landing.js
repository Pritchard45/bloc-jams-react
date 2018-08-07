import React from 'react';
import '../Styles/Landing.css';

const Landing = () => (

  <section className="landing">
    <h1 className="hero-title">Turn the music up!</h1>
    <body className = "image">
    <section className="selling-points">
      <div className="point-one">
        <h2 className="point-title">Choose YOUR music!</h2>
        <p className="point-description">The world is full of music! Why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="point-two">
        <h2 className="point-title">Unlimited streaming and ad-free!!</h2>
        <p className="point-description">No abritrary limits. No distractions.</p>
        </div>
        <div className="point-three">
        <h2 className="point-title">Moblie Enabled</h2>
        <p className="point-description">Listen to your music on the go. This streaming service is available on all moblie platforms</p>
        </div>
    </section>
    </body>
  </section>

);

export default Landing;
