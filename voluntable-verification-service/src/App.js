import './App.css';
import { useState } from "react";
import { VerifyCertificate } from "./components/VerifyCertificate";
import { SearchCertificate } from './components/SearchCertificate';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const [searchData, setSearchData] = useState([]);
    return (
        <div className="App">
            <SearchCertificate setSearchData={setSearchData} />
            {searchData.length === 0 && <VerifyCertificate />}
            {searchData.length > 0 && <div className="search-results">
                <table className='table '>
                    <thead className='thead-light'>
                        <tr>
                            <th scope="col">Certificate Id</th>
                            <th scope="col">Volunteer Name</th>
                            <th scope="col">Volunteer Email</th>
                            <th scope="col">Issuer Name</th>
                            <th scope="col">Issuer Email</th>
                            <th scope="col">Certificate Type</th>
                            <th scope="col">View Certificate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td scope="row">{data.certificateId}</td>
                                    <td>{data.volunteer.fullName}</td>
                                    <td>{data.volunteer.email}</td>
                                    <td>{data.author.fullName}</td>
                                    <td>{data.author.email}</td>
                                    <td style={{ textTransform: "capitalize" }}>{data.certificateType}</td>
                                    <td><button className='viewcert' onClick={() => {
                                        window.open(data.link, "_blank")
                                    }}>View</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}

export default App;
