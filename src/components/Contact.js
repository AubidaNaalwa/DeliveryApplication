import React, { useState, useEffect } from "react";
import '../styles/contact.css'
import axios from "axios";
import ReactSnackBar from "react-js-snackbar";

function Contact() {


    const [sh, setSh] = useState({show: false, showing: false})
    const [message, setMessage] = useState()
    const [company, setCompany] = useState()
    const [userName, setName] = useState('')
    const [userEmail, setEmail] = useState('')
    const [userText, setText] = useState('')
    const emptyContainer = () => {
        setName('')
        setEmail('')
        setText('')
    }
    const sendContact = () => {
        setTimeout(() => {
            setSh({show: false, showing:false});
          }, 2000);

        if (!userName || !userEmail || !userText) {
            setMessage('missing fields ')
            setSh({show: true, showing: true})
            return
        }
        axios.post('/DashBoard/contact', {name:userName, email: userEmail, text: userText})
        setMessage('Message sent')
        emptyContainer()
        setSh({show: true, showing: true})
    }


    const getCompanyInfo = async function () {
        const companyInfo = await axios.get('/companyInfo')
        setCompany(companyInfo.data)

    }

    useEffect(() => {
        getCompanyInfo()
    }, [])


    return (
        <div className="companyInfo">
            <h3>LET'S CONNECT</h3>
            {company && <h2 className='subTitle'>{company.companyName}</h2>}

            {company &&
                <div className="containerCompany">
                    <div className='companyEmail'>
                        <i className="fas fa-envelope"></i>
                        <div className='text'>MAIL</div>
                        <div className='compText'>{company.email}</div>
                    </div>
                    <div className='companyPhoneNumber'>
                        <i className="fas fa-phone"></i>
                        <div className='text'>PHONE NUMBER</div>
                        <div className='compText'>{company.phoneNumber}</div>
                    </div>
                    <div className='companyUrl'>
                        <i className="fab fa-chrome"></i>
                        <div className='text'>OUR WEBSITE</div>
                        <div className='compText'>{company.url}</div>
                    </div>
                    <div className='companyAdress'>
                        <i className="fas fa-map-signs"></i>
                        <div className='text'>OUR MAIN OFFICE</div>
                        <div className='compText'>{company.address}</div>

                    </div>
                    <div className='companyFax'>
                        <i className="fas fa-fax"></i>
                        <div className='text'>FAX</div>
                        <div className='compText'>{company.fax}</div>
                    </div>
                </div>
            }

            <div className='contactUs'>
                <div className='companyMap'>
                    <div className='freeCase'>GET IN TOUCH!</div>
                    <div className='available'>AVAILABLE 24 HOURS A DAY!</div>
                    <input className='text' type='text' placeholder='Enter your name' value={userName} onChange={(e) => { setName(e.target.value) }} required />
                    <input className='text' type='text' placeholder='Enter a valid email address' value={userEmail} onChange={(e) => { setEmail(e.target.value) }} required />
                    <textarea className='text' id='msg' type='text' placeholder='Enter your message' value={userText} onChange={(e) => { setText(e.target.value) }} />
                    <button id='click' className='btn' onClick={sendContact}>Submit</button>
                        <ReactSnackBar Icon={<span>🦄</span>} Show={sh.show}>
                            {message}
                        </ReactSnackBar>
                </div>
                <div className='callUs'>
                    <div className='freeCase'>WE ARE HERE</div>
                    <div className='available'>SUN-THU 8:30AM-5PM / PHONES ARE OPEN 24/7</div>
                    <div id="mapid">
                        <iframe className="companyLocation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8071.476772014608!2d35.44119313214815!3d32.60287923232328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c5b2ff7e3c3b3%3A0x4c02e8436fd3f324!2sTaibe!5e0!3m2!1sen!2sil!4v1611124207049!5m2!1sen!2sil" frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Contact