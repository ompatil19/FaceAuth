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
            <p>FaceAuth uses face authentication technology to accurately track attendance. Users simply<br/> need to scan their faces, and the system will automatically log their attendance. This<br/> helps to streamline the attendance tracking process and eliminate the need for manual recording.</p>
            <Card/>
        </div>
    )
}

export default Home;