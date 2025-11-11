import React from 'react';
import Carousel from '../Components/Corousel';
import Card from '../Components/HomeCards';
import RecentComplains from '../Components/RecentComplains';
import CommunityStats from '../Components/CommunityStats';
import JoinCTA from '../Components/JoinCTA';
import Footer from '../Components/Footer';

const HomePage = () => {
    return (
        <div className='mt-5'>
            <Carousel></Carousel>
            <Card></Card>
            <RecentComplains></RecentComplains>
           <CommunityStats></CommunityStats>
           <JoinCTA></JoinCTA>
           <Footer></Footer>
        </div>
    );
};

export default HomePage;