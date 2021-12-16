import {useEffect, useState} from 'react';
import './App.css';

function App() {

  // get the data from the server
  const [data, setData] = useState([]);
  // get request to the server

  useEffect(() => {
    fetch('http://localhost:5000/reports',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
  
    <div class="container">
      {
        data.map(item => (
         <div class="card">
            <div class="user">
              <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
              <div class="user-info">
                <h5>userID
                  {item.reportDetails.userID}
                </h5>
                <small>2h ago</small>
              </div>
            </div>
            <div class="card-body">
              <span class="tag tag-teal">
                POTATO
                {item.reportDetails.cmdtyName}
              </span>
              <h4>
                MARKET: MANDI
                {item.reportDetails.marketName}
              </h4>
              <p>
                PRICE: 700
                {item.reportDetails.minprice} - 
                {item.reportDetails.maxprice}
              </p>
              <p>
                UNIT: PACK
                {item.reportDetails.priceUnit}
              </p>
              <p>
                CONVERSION FACTOR: 50
                {item.reportDetails.convFctr}
              </p>
              
            </div>
          </div>
         ))
      }
    </div>
  );
}

export default App;
