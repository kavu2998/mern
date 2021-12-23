import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [contacts, setContacts] = useState([])
    const [reload, setReload] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:5000/contacts/")
            .then((response) => {
                //console.log(response.data)
                setContacts(response.data)
            })
            .catch(error => console.log(error))
        setReload(false)
    }, [reload])

    const editContact = (contact) => {
        navigate(`/edit/${contact._id}`, { state: contact })
    }

    const deleteContact = (id) => {
        axios.delete(`http://localhost:5000/contacts/${id}`)
            .then(response => setReload(true))
            .catch(error => console.log(error))
    }

    return (
        <table className=" container table table-hover" style={{ margin: '50px auto' }}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Phone Numer</th>
                    <th scope="col">Address</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    contacts && contacts.map((contact, index) => {
                        return (
                            <tr key={contact._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{contact.name}</td>
                                <td>{contact.age}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.address}</td>
                                <td><span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { editContact(contact) }}>edit</span> | <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { deleteContact(contact._id) }}>remove</span></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Home
