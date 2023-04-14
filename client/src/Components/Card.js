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
              src='images/manage.jpg'
              text="Managing and tracking user information can be a challenging task, especially for businesses and organizations with a large number of users. That's why FaceAuth offers a user management system that makes it easy to manage and track user information. Our system allows you to view and edit user data, monitor user activity, and generate reports. This feature helps you stay organized and make informed decisions based on user data."
              label='User Management'
              path='/About'
            />
            <CardItems
              src='images/security.jpg'
              text='Security is a top priority for FaceAuth, which is why we offer advanced security features such as anti-spoofing and liveness detection. These features help prevent fraudulent activities by verifying that the user is a real person and not a photograph or video. Our software is also equipped with state-of-the-art encryption to ensure that user data is kept safe at all times.
              '
              label='Advanced Security'
              path='/About'
            />
          </ul>

          <ul className='cards__items'>
            <CardItems
              src='images/login.png'
              text="With FaceAuth, users can sign in quickly and easily using facial recognition technology. This feature eliminates the need for traditional passwords, which can be lost, forgotten, or easily hacked. By using facial recognition, you can provide a more secure and convenient sign-in experience for your users.
              "
              label='Facial Recognition Sign-In'
              path='/About'
            />
            <CardItems
              src='images/streamlined.jpg'
              text='Your face authentication website is user-friendly because it has an intuitive interface, fast and accurate facial recognition technology, and clear feedback for users. It also has robust security measures in place to protect user data, without compromising convenience or ease of use.'
              label='User Friendly'
              path='/About'
            />
          </ul>

          {/* <ul className='cards__items'>
            <CardItems
              src='images/security.jpg'
              text='Highly secure face authentication ensures reliable attendance tracking, keeping user data safe and protected.'
              label='Security'
              path='/About'
            />
    
          </ul> */}

        </div>
      </div>
    </div>
  );
}

export default Cards;