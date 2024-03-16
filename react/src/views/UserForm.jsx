import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';

export const UserForm = () => {

  const { id } = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          //TODO show notification
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post(`/users`, user)
        .then(() => {
          //TODO show notification
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>Loading...</div>
        )}
        {errors &&
          <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading &&
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={ev => setUser({ ...user, name: ev.target.value })}
              placeholder="Name"
              type='text'
            />
            <input
              value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
              type='email'
            />
            <input
              onChange={ev => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
              type='password'
            />
            <input
              onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
              placeholder="Password Confirmation"
              type='password'
            />
            <button className='btn'>Save</button>
          </form>
        }
      </div>
    </>
  )
}
