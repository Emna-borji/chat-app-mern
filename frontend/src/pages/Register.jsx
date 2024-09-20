import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row, Alert, Spinner } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { register } from '../redux/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPasssword, setConfirmPassword] = useState("")
    const [pic, setPic] = useState("")
    
    const {user, isLoading, isError, message} = useSelector((state)=>state.authReducer)
    const dispatch = useDispatch()

    const handlePictureChange = (e) => {
        setPic(e.target.files[0]);
        console.log(e.target.files[0]); // For debugging purposes
    };

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (password !== confirmPasssword) {
            return alert("Passwords do not match")
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('pic', pic); // Append the file

        dispatch(register(formData));
    }

    if(user)
        return <Navigate to="/Chats"/>
        
  return (
    <FormContainer>
        <h1 className='text-center mb-5'>
            Account <span className="text-primary">Register</span>
        </h1>
        {isError && <Alert variant='danger'>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label className='mb-3'>
                    Name
                </Form.Label>
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
                <Form.Label className='mb-3'>
                    Email
                </Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}>
                    
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='password'>
                <Form.Label className='mb-3'>
                    Password
                </Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='ConfirmPassword'>
                <Form.Label className='mb-3'>
                    Confirm Password
                </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPasssword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                    
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFile">
                <Form.Label>Upload your Picture</Form.Label>
                <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                />
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>{isLoading && <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true'/>} {isLoading ? "waiting..." : "Sign up"}</Button>
            <Row className="py-3">
                <Col>
                    Already have an account? <Link to="/login">Login</Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default Register