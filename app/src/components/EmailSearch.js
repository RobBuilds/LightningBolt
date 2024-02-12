import React, { useState } from 'react';
const api_key = "58e67f389627b16e2b18bf6ecb18ea99ab9dff9d";
export default function SearchAddress() {
  const [site, setSite] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const url = `https://api.hunter.io/v2/email-finder?domain=${site}&first_name=${firstName}&last_name=${lastName}&api_key=${api_key}`;
    const res = await fetch(url);
    const data = await res.json();
    setSearchResults(data);
  }
  return (
    <form className="nav-bar" onSubmit={handleSearch}>
      <div className="search-wrapper">
        <input
          className="Search"
          type="text"
          placeholder="Search Web Address"
          name="site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <input
          className="Search"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="Search"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button className="submit" type="submit">
          Search
        </button>
      </div>
      {searchResults && (
        <div>
          <h2>Email: {searchResults.data.email}</h2>
          <p>Score: {searchResults.data.score}</p>
          <p>Position: {searchResults.data.position}</p>
          <p>Company: {searchResults.data.company}</p>
          <p>Phone Number: {searchResults.data.phone_number}</p>
          <p>Twitter: {searchResults.data.twitter}</p>
          <p>Linkedin: {searchResults.data.linkedin_url}</p>
        </div>
      )}
    </form>
  )}