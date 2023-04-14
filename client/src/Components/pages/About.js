import React from 'react';
import '../../App.css'
import Card from '../Card';

import '../CardItems.css'

const headingStyling = {
    paddingTop: '40px',
    textAlign: 'center'
}

function Home(){
    return (
        <div className="homeContainer">
            <h2>What is FaceAuth?</h2>
            <p>FaceAuth is a powerful software that helps you sign in and authenticate users quickly and securely using facial recognition technology. With FaceAuth, you can streamline your authentication process, increase security, and provide a convenient sign-in experience for your users. Get started today and see the benefits for yourself!</p>
            <Card/>
        </div>
    )
}

export default Home;