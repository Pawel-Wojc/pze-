///{label, type, id , placeholder, regex}
import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function Input ({label, type, id, placeholder, regex, warning }, onchange) {

    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);

        // If a regex is provided, test the new input value against it
        if (regex) {
            const pattern = new RegExp(regex);
            setIsValid(pattern.test(newValue));
        }
    };
    return (   
    <>
        <FloatingLabel>{label}</FloatingLabel>
        <Form.Control type = {type} placeholder={placeholder} id= {id} onBlur={handleChange} onChange={onchange}/> 
        {!isValid && <div style={{ color: 'red' }}>{warning ? warning : "Input does not match the required format."}</div>}    
    </>

)}