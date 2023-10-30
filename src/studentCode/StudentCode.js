import React, { useLayoutEffect, useState } from 'react';
import './StudentCode.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { useLocation, useNavigate, useHistory } from 'react-router-dom'
import axios from 'axios';
import Modal from './Modal';
import './Modal.css';

function StudentCode() {

    // const navigate = useNavigate();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    let location = useLocation();
    let { subject_name, class_name } = location.state
    //console.log(`subject_name: ${subject_name}, class_name: ${class_name}`)

    const fetchCode = async () => {
        try {
            let response = await axios.get('/db/subjects');
            //Gets the codes array for a specific subject and class
            let codesArray = response.data.find(subject => subject.subject_name === subject_name)?.classes.find(_class => _class.class_name === class_name)?.codes;
            //Gets the first code in the codesArray
            console.log(JSON.stringify(codesArray))
            //let firstCode = codesArray = codesArray ? codesArray[0]?.value : undefined;
            let code = codesArray ? codesArray[codesArray.length - 1]?.value : undefined;
            console.log(code)
            
            return code
        } catch (error) {
            console.log(error)
            throw error
        }
    }



    //need to get the subject code from database
    const verifyCode = async (event) => {
        event.preventDefault();
        try {
            const codeGen = await fetchCode();
            var inputCode = event.target[0].value;

            //console.log("inputCode: " + inputCode);

            if (codeGen === inputCode) {
                setOpenModal(true);
                //navigate('/dashboard?success=true');
            } else {
                // Handle incorrect code
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 2000);

            }
        } catch (error) {
            console.error(error);
            // Handle the error if fetchCode fails
            alert("Error occurred while verifying code. Please try again later.");
        }
    }
    return (
        <>

            <Navbar></Navbar>
            <div className='code-container'>
                <div className="enterCode">
                    <div className="class-title">
                        <h1>Enter Class Code</h1>
                    </div>
                    <form className="form-container" type="text" onSubmit={verifyCode} >
                        <input name="inputCode" placeholder="Class CODE" class="codeInput"></input>
                        <button type="submit" class="codeButton">Enter</button>
                    </form>
                    {openModal && <Modal openModal={setOpenModal} />}
                </div>
                {showErrorMessage && <div className="errorBox">Could not find related subject. Please enter code again.</div>}
            </div>

        </>
    );
}

export default StudentCode;