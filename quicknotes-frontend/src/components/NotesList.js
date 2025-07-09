import React, { useState } from "react";
import API from "../../api";
import { Link } from "react-router-dom";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tag, setTag] = useState('');

  return <div></div>;
}
