import React, { useState, useEffect } from 'react';
import './SubjectPageStyles.css';
import Navbar from '../components/Navbar';
import BasicTable from '../table/BasicTable'
import { Class } from '../menu/Menu';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom'

function getNextClass (arr) {
    let now = new Date();
    for (let time of arr){
        let difference = now.getTime() - new Date(time).getTime();
        if (difference < 0) {
            return time;
        }
    }
}

function sortfn (a,b) {
    let now = new Date();
    let time1, time2;
    time1 = getNextClass(a.class_start_timestamps);
    time2 = getNextClass(b.class_start_timestamps);
    return time2 - time1;
}

function SubjectPage() {
    
    let [classData, setClasses] = useState([]);
    let location = useLocation();
    let { subject_id } = location.state;
    useEffect(() => {

        const fetchClass = async () => {
            try {
                let response = await axios.get('/db/subjects');
                let classes = response.data.find(s => s._id === subject_id).classes;
                classes.sort(sortfn());
                // sortfn(classes, classes);
                setClasses(classes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchClass();
    }, [subject_id]);

    return (
        <>
            <div className="App">
                <Navbar/>
            </div>
            <div className="ClassList"> 
                {classData.map(_class => (
                    <Class
                        key={_class._id}
                        className={_class.class_name}
                        subject_id={subject_id}
                        class_id={classData.indexOf(_class)}
                        time={new Date(getNextClass(_class.class_start_timestamps)).toDateString() ?? ""}
                    />))
                }
            </div>
        </>
    );
}

export default SubjectPage;
