import { useEffect, useState } from 'react';
import "./index.css";

export const SearchCertificate = (props) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = async (event) => {
        setSearch(event.target.value);
        let request = await fetch('https://api.onedelhi.voluntable.com/v1/certificate/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({search: event.target.value}),
        });
        let response = await request.json();
        if(response.certificates){
            props.setSearchData(response.certificates);
        }
        if(event.target.value === ''){
            props.setSearchData([]);
        }
        console.log(event.target.value)
    }

    return (
        <>
            <div style={{ margin: "20px 5px" }}>
                <h3>Search using Certificate ID</h3>
                <input type="text" placeholder="Search" className='searchinput' onChange={handleChange} value={search}/>

            </div>
            <div style={{ margin: "20px 5px" }}>
                <h3>OR</h3>
            </div>
        </>
    )
}