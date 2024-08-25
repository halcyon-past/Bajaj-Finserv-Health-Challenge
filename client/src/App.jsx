import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        throw new Error("Invalid JSON structure.");
      }
      setError('');
      
      const res = await fetch('https://ec2-13-201-54-155.ap-south-1.compute.amazonaws.com/:3000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });
      const result = await res.json();
      setResponse(result);
    } catch (e) {
      setError(e.message);
      setResponse(null);
    }
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' },
  ];

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected ? selected.map(option => option.value) : []);
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = {};
    if (selectedOptions.includes('alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Challenge (Qualifier 1)</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Select Data to Display:</h3>
          <Select
            isMulti
            name="options"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleOptionChange}
          />
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
