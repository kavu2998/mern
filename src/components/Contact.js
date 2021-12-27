import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

function Contact() {
    const [ name, setName ] = useState('')
    const [ age, setAge ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [address, setAddress ] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()

    useEffect(()=>{
        if(id){
            setName(location.state.name)
            setAge(location.state.age)
            setPhone(location.state.phone)
            setAddress(location.state.address)
        }else{
            setAddress('')
            setAge('')
            setName('')
            setPhone('')
        }
    },[id])

    const submitForm = (e) => {
        e.preventDefault()
        let contact = {
            name,
            phone:Number(phone),
            address,
            age:Number(age)
        }
        if(id){
            axios.post(`http://localhost:5000/contacts/update/${id}`, contact,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
              })
            .then(response=>navigate('/'))
            .catch(error=>console.log(error))
        }else{
            axios.post('http://localhost:5000/contacts/add',contact,{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
              })
            .then(response=>navigate('/'))
            .catch(error=>console.log(error))
        }
    }

    return (
        <form onSubmit={submitForm} className="container" style={{margin:"200px auto"}}>
            <div className="form-group">
                <label htmlFor="Name">Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <br />
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Age:</label>
                <input type="number" className="form-control" id="age" placeholder="Enter age" name="age" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
                <br />
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Phone Number:</label>
                <input type="number" className="form-control" id="phone" placeholder="Enter phone number" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                <br />
            </div>
            <div className="form-group">
                <label htmlFor="pwd">Address:</label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" name="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                <br />
            </div>
            <button type="submit" className="btn btn-info position-absolute top-200 start-50 translate-middle">{id ? 'Update' : 'Submit'}</button>
        </form>
    )
}

export default Contact
