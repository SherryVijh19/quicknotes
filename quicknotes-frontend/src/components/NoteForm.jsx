// import React from 'react'
import{useState,useEffect} from 'react';
import API from '../api';
import { useNavigate,useParams } from 'react-router-dom';

export default function NoteForm() {
    const [form,setForm]=useState({title:'',content:'',tags:''});
    const {id}=useParams();
    const navigate=useNavigate();
    const loadNote=async()=>{
        if(id){
            const res=await API.get(`/notes/${id}`);
            setForm({...res.data,tags:res.data.tags.join(',')});
        }
     };

     useEffect(()=>{loadNote();},[id]);

     const handleSubmit=async(e)=>{
        e.preventDefault();
        const payload={...form,tags:form.tags.split(',').map(t=>t.trim())};
        if(id){
            await API.put(`/notes/${id}`,payload);
        }
        else{
            await API.post('/notes',payload);
        }
        navigate('/');
     };


  return (
    <form onSubmit={handleSubmit}>
        <input placeholder='Title' value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} type="text" />
        <input placeholder='Tags(comma-separated)' value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})} type="text" />
        <input placeholder='Content' value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})} type="text" />
        <button type='submit'>{id?'Update':'Create'}Note</button>
    </form>
  )
}
