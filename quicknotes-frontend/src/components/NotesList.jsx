import { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tag, setTag] = useState('');

  const fetchNotes=async()=>{
    const res=await API.get(`/notes?page=${page}&limit=5&tag=${tag}`);
    setNotes(res.data.notes);
    setTotalPages(res.data.totalPages);
  };

  useEffect(()=>{fetchNotes();},[page,tag]
);

  return (
  <div>
    <input placeholder="Filter by tag" value={tag} onChange={(e)=>setTag(e.target.value)}/>
    <ul>
        {notes.map((n)=>(
            <li key={n.id}>
                <h4>{n.title}</h4>
                <p>{n.content}</p>
                <p>Tags:{n.tags.join(',')}</p>
                <Link to={`/edit/${n.id}`}>Edit</Link>
            </li>
        ))}
    </ul>
    <button onClick={()=>setPage((p)=>Math.max(p-1,1))} disabled={page===1}>Prev</button>
    <span>Page{page} of {totalPages}</span>
    <button onClick={()=>setPage((p)=>Math.min(p+1,totalPages))} disabled={page===totalPages}>Next</button>
    <br />
    <Link to="/add">Add Note</Link>
  </div>
  );
}
