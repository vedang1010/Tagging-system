import React from 'react';
import './styles/ComponentCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUser, FaCalendarAlt, FaFileArchive, FaTags, FaGlobe, FaExclamationCircle, FaEdit } from 'react-icons/fa';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComponentStore from './ComponentStore';

const ComponentCard = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Content />
        {/* <Sidebar /> */}
      </div>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Component Store</h1>
      </div>
    </header>
  );
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>People also view</h3>
      <ul>
        <li><a href="#whatsapp">WhatsApp</a></li>
        <li><a href="#idev">iDev</a></li>
        <li><a href="#viber">Viber</a></li>
        <li><a href="#telegram">Telegram Desktop</a></li>
        <li><a href="#twitter">Twitter</a></li>
      </ul>
    </aside>
  );
};

const Content = () => {
  return (
    <div className='box'>
      <main className="content">
        <AppDetails />
      </main>
      <main className="content">
        <Screenshots />
      </main>
      <main className="content">
        <Description />
      </main>
      <main className="content">
        <Ratings />
      </main>
      <main className="content">
        <SystemRequirements />
      </main>
      <main className="content">
        <AdditionalInfo />
      </main>
    </div>
  );
};

const AppDetails = () => {
  return (
    <section className="app-details">
      <div className="inner-container">
        <div className="app-info">
          <img src="https://img.icons8.com/?size=100&id=xuvGCOXi8Wyg&format=png&color=000000" alt="LinkedIn" />
          <div className="app-meta">
            <h1>LinkedIn</h1>
            <p>4.2 ★ | 1.73K ratings | Social</p>
          </div>
        </div>
        <button className="cta-button">Download Component</button>
      </div>
    </section>
  );
};

const Description = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="description">
      <h2>Description</h2>
      <p>Grow your career on the largest social networking app for professionals. With LinkedIn for Windows, you can keep up-to-date with your community and new job opportunities, connect with recruiters, and use your profile to share your professional story.</p>

      {isExpanded && (
        <>
          <h3>Top ways to use LinkedIn to boost your career:</h3>
          <h4>JOB SEARCH</h4>
          <ul>
            <li>Apply job search filters to help find the right roles for you out of millions of openings</li>
            <li>Use your profile as a virtual resume that highlights your accomplishments, skills, and experience</li>
            <li>Turn on Open to Work to increase your likelihood of getting a recruiter message by 2X</li>
          </ul>
          <h4>NETWORKING</h4>
          <ul>
            <li>Keep in touch with friends, classmates, and colleagues</li>
            <li>Reply to messages with desktop notifications</li>
            <li>Get referrals and advice from connections at companies you’re interested in</li>
          </ul>
          <h4>CONTENT</h4>
          <ul>
            <li>Follow companies and thought leaders that interest you</li>
            <li>Curate your newsfeed to learn the latest industry news</li>
            <li>Share articles, news, and career knowledge with your network</li>
          </ul>
          <p>The LinkedIn app is free to use and download.</p>
          <p>Want to make the most of LinkedIn? Upgrade to a Premium Career subscription for exclusive tools to find a job, grow your business, find sales leads, or hire talent – priced from $39.99 monthly and $329.99 annually in the US.</p>
          <p>Download the app now.</p>
        </>
      )}

      <button className="toggle-button" onClick={handleToggle}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </section>
  );
};

const Ratings = () => {
  return (
    <section className="ratings">
      <h2>Ratings and reviews</h2>
      <div className="rating-overview">
        <div className="rating-score">
          <span className="rating-value">4.2</span>
          <span className="rating-stars">★</span>
          <span className="rating-count">18,156 RATINGS</span>
        </div>
        <div className="rating-bars">
          <div className="rating-bar">5 
            <span className="rating-bar-fill" style={{ width: '70%' }}></span>
            <span className="rating-bar-label"></span>
          </div>
          <div className="rating-bar">4
            <span className="rating-bar-fill" style={{ width: '15%' }}></span>
            <span className="rating-bar-label"></span>
          </div>
          <div className="rating-bar">3
            <span className="rating-bar-fill" style={{ width: '10%' }}></span>
            <span className="rating-bar-label"></span>
          </div>
          <div className="rating-bar">2
            <span className="rating-bar-fill" style={{ width: '3%' }}></span>
            <span className="rating-bar-label"></span>
          </div>
          <div className="rating-bar">1
            <span className="rating-bar-fill" style={{ width: '2%' }}></span>
            <span className="rating-bar-label"></span>
          </div>
        </div>
      </div>
      <div className="review">
        <div className="review-header">
          <span className="review-rating">5.0 ★</span>
          <span className="review-title">INSTALLING WHATSAPP WINDOWS</span>
        </div>
        <div className="review-body">
        <p>My laptop runs on Windows 10 Home. When I try to install from Windows Store I get an updating error referred to troubleshooter that fails to update.</p>
        </div>
        <div className="review-footer">
          <span className="review-author">Ziad, 14/04/2024</span>
          <div className="review-actions">
            <span className="review-action">👍 94</span>
            <span className="review-action">👎 27</span>
          </div>
        </div>
        <a className="read-more" href="#">Read more</a>
      </div>
    </section>
  );
};

const SystemRequirements = () => {
  return (
    <section className="system-requirements">
      <h2>System Requirements</h2>
      <div className="requirements-grid">
        <div><strong>Available on:</strong> PC</div>
        <div><strong>OS:</strong> Windows 10 version 18362.0 or higher</div>
        <div><strong>Architecture:</strong> x64</div>
        <div><strong>Keyboard:</strong> Not specified (Minimum), Integrated Keyboard (Recommended)</div>
        <div><strong>Mouse:</strong> Not specified (Minimum), Integrated Mouse (Recommended)</div>
        <div><strong>Camera:</strong> Not specified (Minimum), Integrated Camera (Recommended)</div>
      </div>
    </section>
  );
};

const AdditionalInfo = () => {
  const tags = ['Social', 'Networking', 'Professional', 'T2', 'T3', 'T4', 'Social3', 'Social3', 'Socialfrf', 'Socialrr', 'Socialfrde', 'Socialrrrerr', 'Socialrrrerreedf', 'Socialrrrerrrtrf', 'Socialrrrerrfred'];

  return (
    <section className="additional-info">
      <h2>Additional Information</h2>
      <div className="info-grid">
        <div><FaUser /> <strong>Contributed by:</strong> LinkedIn</div>
        <div><FaCalendarAlt /> <strong>Release date:</strong> 12/05/2012</div>
        <div><FaFileArchive /> <strong>Approximate size:</strong> 132.8 MB</div>
        <div>
          <FaTags /> <strong>Tags:</strong>
          <div className="tags-container">
            {tags.map(tag => (
              <Link key={tag} to={`/tags/${tag.toLowerCase()}`} className="tag-button">
                {tag}
              </Link>
            ))}
          </div>
        </div>
        <div><FaGlobe /> <strong>Installation:</strong> Get this app while signed in...</div>
        <div><FaGlobe /> <strong>Supported languages:</strong> English, Spanish, French, German</div>
        <div><FaExclamationCircle /> <strong>Legal disclaimer:</strong> Use of this app is subject to the terms and conditions set by LinkedIn.</div>
      </div>
      <div className="button-group">
        <button className="raise-issue"><FaExclamationCircle /> Raise Issue</button>
        <button className="modify-component"><FaEdit /> Modify Component</button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 SIEMENS</p>
    </footer>
  );
};

const Screenshots = () => {
  return (
    <section className="screenshots">
      <h2>Screenshots</h2>
      <div id="mz-gallery-container">

        <div id="mz-gallery">

          <figure>
            <img src="https://picsum.photos/id/818/700/700" alt="Statue of Liberty" width="700" height="700" />
            <figcaption>Statue of Liberty</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/537/700/700" alt="Night Sky" width="700" height="700" />
            <figcaption>Night Sky</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/136/700/700" alt="Ravine Between Rocks" width="700" height="700" />
            <figcaption>Ravine Between Rocks</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/337/700/700" alt="Wheat Farm" width="700" height="700" />
            <figcaption>Wheat Farm</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/737/700/700" alt="City Street" width="700" height="700" />
            <figcaption>City Street</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/217/700/700" alt="Crumbling Pier" width="700" height="700" />
            <figcaption>Crumbling Pier</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/416/700/700" alt="Foggy Mountains" width="700" height="700" />
            <figcaption>Foggy Mountains</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/811/700/700" alt="Dense Forest" width="700" height="700" />
            <figcaption>Dense Forest</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/902/700/700" alt="Sunset Over Mountains" width="700" height="700" />
            <figcaption>Sunset Over Mountains</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/514/700/700" alt="SUV in Front of Building" width="700" height="700" />
            <figcaption>SUV in Front of Building</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/111/700/700" alt="Classic Vehicle" width="700" height="700" />
            <figcaption>Classic Vehicle</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/168/700/700" alt="Stacked Rocks" width="700" height="700" />
            <figcaption>Stacked Rocks</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/210/700/700" alt="Brick Wall" width="700" height="700" />
            <figcaption>Brick Wall</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/270/700/700" alt="Waterfront" width="700" height="700" />
            <figcaption>Waterfront</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/315/700/700" alt="Overgrown Buildings" width="700" height="700" />
            <figcaption>Overgrown Buildings</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/562/700/700" alt="Dying Trees" width="700" height="700" />
            <figcaption>Dying Trees</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

          <figure>
            <img src="https://picsum.photos/id/385/700/700" alt="Ocean View" width="700" height="700" />
            <figcaption>Ocean View</figcaption>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </figure>

        </div>

      </div>

    </section>)
}

export default ComponentCard;