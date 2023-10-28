import React, { useState, useEffect } from 'react';
import './ClassPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import axios from 'axios';
import { Class } from '../menu/Menu';
import { useLocation } from 'react-router-dom'
import { Subject } from '../Subject'
import { SClass } from '../SClass'
import { ClassCode } from '../ClassCode'


function ClassPage() {


    let location = useLocation();
    let { class_id, class_name, subject_id, subject_name, start_time, end_time, classes, codes, subjectData } = location.state

    
    const newClass = new SClass(class_id, class_name, start_time, end_time, codes)
    const newSubject = new Subject(subject_id, subject_name, classes)
    newSubject.classes.push(newClass);

    const [codeGen, setCode] = useState('');

    function generateCode() {

     
         //const newSubject = new Subject(subject_id, subject_name, classes)
        // const newClass =  newSubject.addClass(class_id, class_name, start_time, end_time, codes)
        // newClass.addCode(end_time)
        // newSubject.saveToServer()


        
       
        //const newClass = new SClass(class_id, class_name, start_time, end_time, codes )
        //const newSubject = new Subject(subject_id, subject_name, classes)
       
        //MARCUS
        //const newSubject = new Subject(subjectData._id, subjectData.subject_name, []);
        
        // for (let i = 0; i < subjectData.classes.length; i++) {
        //     const classData = subjectData.classes[i];
        //     const newClass = new SClass(classData._id, classData.class_name, [], []);
            
        //     for (let j = 0; j < classData.class_start_timestamps.length; j++) {
        //         const newCode = new ClassCode(classData.codes[j]._id, classData.codes[j].value, classData.codes[j].expiry, classData.codes[j].users_selected, classData.codes[j].users_passed);
                
        //         newClass.codes.push(newCode);
        //     }
            
        //     newSubject.classes.push(newClass);
        // }


        //LIV 
        const newCode = new ClassCode(end_time)
        
        
        
        // console.log("BEFORE: " + JSON.stringify(newSubject, null, 2))
        newClass.codes.push(newCode)

        //29/10/2023 - saves the code to the right classs 
        

        // const existingClassIndex = classes.findIndex(existingClass => existingClass.class_id === class_id);

        // if (existingClassIndex !== -1) {
        //     // If the class_id already exists, push the test object to the existing class's array
        //     newSubject.classes[existingClassIndex] = newClass;
        //     return "Class added to existing class successfully!";
        // } else {
        //     // If the class_id doesn't exist, push the test object into the classes array
        //     
        //     return "New class added successfully!";
        // }
        // newSubject.classes.push(newClass)
        
        // newSubject.classes.push(newClass)

        // console.log(JSON.stringify(newClass, null, 2))
        // console.log(JSON.stringify(newClass.codes, null, 2));
        
        console.log("AFTER: " + JSON.stringify(newSubject, null, 2))
        // console.log(JSON.stringify(newSubject.classes, null, 2));
        



        // console.log(JSON.stringify(newSubject))
        // newSubject.saveToServer(newSubject)
        
        //setCode(newCode.value)

      

        

        //newSubject.classes.push(newClass) //ADD if statement !
        //newClass.codes.push(newCode)
        //newSubject.saveToServer(newSubject)
        // console.log("test: " + JSON.stringify(newSubject))

        // const newSubject = new Subject(subject_id, subject_name, classes)
        // newSubject.addClass(class_id, class_name, start_time, end_time, codes)



    }

    function disableCode() {
        let code = "";
        setCode(code);
    }


    return (
        <>
            <Navbar></Navbar>
            <h className='codeText'>{codeGen}</h>
            <div className="code dashboard-row">
                <button onClick={generateCode}><i className='fa fa-refresh'></i> Regenerate code</button>
                <button onClick={disableCode}><i className='fa fa-remove'></i> Disable code</button>
            </div>
            <div className='table'>
                <BasicTable class_id={class_id} subject_id={subject_id} startTime={start_time} />
            </div>
            <div className="whitespace" />
        </>
    );
}

export default ClassPage;
