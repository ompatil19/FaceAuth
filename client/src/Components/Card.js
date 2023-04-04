// import React from 'react'
// import CardItemss from './CardItemss'
// import './Card.css'

// function Card() {
//     return (
//         <div>
//             <h1>Check out these EPIC destinations</h1>
//             <div className="cards__container">
//                 <div className="cards__wrapper">
//                     <ul className="cards__item">
//                         < CardItemss
//                             src="images/accurate.jpg"
//                             text="Attendance is accurately tracked without any manual intervention, reducing errors and inaccuracies."
//                             label="Accuracy"
//                             path='/About'

//                         />

//                         < CardItemss
//                             src="images/streamlined.jpg"
//                             text="Automated attendance tracking with face scanning streamlines the process, saving time and effort."
//                             label="Streamlined"
//                             path='/About'

//                         />

//                         < CardItemss
//                             src="images/security.jpg"
//                             text="Highly secure face authentication ensures reliable attendance tracking, keeping user data safe and protected."
//                             label="Secure"
//                             path='/About'

//                         />


//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Card

import React from 'react';
import './Card.css';
import CardItems from './CardItems';

function Cards() {
  return (
    <div className='cards'>
      <h1>Features</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItems
              src='images/accurate.jpg'
              text="Attendance is accurately tracked without any manual intervention, reducing errors and inaccuracies."
              label='Accuracy'
              path='/About'
            />
            <CardItems
              src='images/streamlined.jpg'
              text='Automated attendance tracking with face scanning streamlines the process, saving time and effort.'
              label='Strealined'
              path='/About'
            />
          </ul>
          <ul className='cards__items'>
            <CardItems
              src='images/security.jpg'
              text='Highly secure face authentication ensures reliable attendance tracking, keeping user data safe and protected.'
              label='Security'
              path='/About'
            />
    
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;