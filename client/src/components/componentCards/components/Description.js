import React from 'react'
import { useState } from 'react';
import HtmlRenderer from '../../../utils/HtmlRenderer';
const Description = ({component}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // const description = {
    //   short: 'Grow your career on the largest social networking app for professionals. With LinkedIn for Windows, you can keep up-to-date with your community and new job opportunities, connect with recruiters, and use your profile to share your professional story.',
    //   full: (
    //     <>
    //       <h3>Top ways to use LinkedIn to boost your career:</h3>
    //       <h4>JOB SEARCH</h4>
    //       <ul>
    //         <li>Apply job search filters to help find the right roles for you out of millions of openings</li>
    //         <li>Use your profile as a virtual resume that highlights your accomplishments, skills, and experience</li>
    //         <li>Turn on Open to Work to increase your likelihood of getting a recruiter message by 2X</li>
    //       </ul>
    //       <h4>NETWORKING</h4>
    //       <ul>
    //         <li>Keep in touch with friends, classmates, and colleagues</li>
    //         <li>Reply to messages with desktop notifications</li>
    //         <li>Get referrals and advice from connections at companies you’re interested in</li>
    //       </ul>
    //       <h4>CONTENT</h4>
    //       <ul>
    //         <li>Follow companies and thought leaders that interest you</li>
    //         <li>Curate your newsfeed to learn the latest industry news</li>
    //         <li>Share articles, news, and career knowledge with your network</li>
    //       </ul>
    //       <p>The LinkedIn app is free to use and download.</p>
    //       <p>Want to make the most of LinkedIn? Upgrade to a Premium Career subscription for exclusive tools to find a job, grow your business, find sales leads, or hire talent – priced from $39.99 monthly and $329.99 annually in the US.</p>
    //       <p>Download the app now.</p>
    //     </>
    //   )
    // };
    const description = {
      short:<HtmlRenderer htmlString={component.description.short} />,
      full: (
        <>
        {<HtmlRenderer htmlString={component.description.full} />}
        
        </>
      )
    };
  
    const handleToggle = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <section className="description">
        <h2>Description</h2>
        {description.short}
  
        {isExpanded && description.full}
  
        <button className="toggle-button" onClick={handleToggle}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </section>
    );
};

export default Description
