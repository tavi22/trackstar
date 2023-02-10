import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Trackstar!</h1>
      <p className='mt-2'>Trackstar is a budgeting app that helps you organize and save your money better.
       With its user-friendly interface, you can easily track your income and expenses and stay on top of your finances.</p>
       <p>Add new folders and transactions by going to the <Link to='/folders'>Folders</Link> page.</p>
       <p>Add an article to help others with some useful information by going to the <Link to='/tips'>Tips</Link> page.</p>
       <p>Lastly, you can see a line chart comparing you expenses and earnings for each month in the <Link to='/analytics'>Analytics</Link> page.</p>
    </div>
  );
};

export default Home;