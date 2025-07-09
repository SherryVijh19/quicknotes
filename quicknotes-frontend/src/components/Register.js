import React,{useState} from 'react'
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const[form,setForm]=useState({name:"",email:"",password:""});
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res=await API.post('/auth/register',form);
        localStorage.setItem('token',res.data.token);
        navigate('/');
    }
    catch{
        alert('Registration Failed')
    }
};
  return (
     <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input type="text" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button type="submit">Register</button>
    </form>
  )
}
