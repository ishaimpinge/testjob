import React, {useEffect, useState} from 'react';
import './App.css';
function App(props:any) {
    const [city,
        setcity] = useState('');
    const [Locationname,
        setLocationname] = useState('');
    const [userdata,
        setUserdata] = useState([]);
    const [error,
        setError] = useState(null)
        const value=window.location.search.split('?city=');
       
    const handleSubmit = (event : any) => {
    }
    useEffect(()=>{
        // event.preventDefault();
        fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + value[1] + '&mode=json&units=imperial&appid=2a6ed6669671100313d8ccd388e8784e').then(async response => {
            const isJson = response
                .headers
                .get('content-type')
                ?.includes('application/json');
            const data = isJson && await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            setUserdata(data.list);
            setLocationname(data.city.name);
        }).catch(error => {
            setError(error.toString());
            setTimeout(() => {
                setError(null);
            }, 3000);
            console.error('There was an error!', error);
        });
      }, [value[1]])

    return (

        <div className="App">
            {error
                ? <div
                        className="error"
                        style={{
                        color: 'white',
                        background: 'red',
                        padding: '10px'
                    }}>
                        <i className="material-icons error-icon"></i>
                        {error}
                    </div>
                : null}

            <form className="step1submit" onSubmit={handleSubmit}>
                    <label>Please enter the city</label>
                <input
                    name="city"
                    type="text"
                    value={city}
                    onChange={e => setcity(e.target.value)}
                    required/>
                <button onChange={handleSubmit} className="btn btn-blue">Send</button>
            </form>
            <h1>
                {` ${Locationname}`}</h1>
            {userdata && userdata.map((note : any, index) => {

                return ( <> <div
                    className="contdata"
                    style={{
                    'border': '1px solid #ccc',
                    'float': 'left',
                    'width': '23%'
                }}>
                    <h4>
                        {` Date : ${note.dt_txt}`}</h4>
                        <h3>{`Temp : ${note.main.temp}`}</h3>
                    {`Wheather : ${note.weather[0].description}`}, {`humidity : ${note.main.humidity}`}
                    <h4 style={{
                        'color': 'red'
                    }}>{note.weather[0].main === 'Rain'
                            ? 'Best day to sell an umbrella'
                            : note.weather[0].main === 'Clouds'
                            ? 'Best day to sell an jacket'
                            : 'No Sell'}
                            </h4>
                </div> </>
          )
        })}
        </div>
    );
}

export default App;
