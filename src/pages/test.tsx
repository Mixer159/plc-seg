import React from 'react'

const Test: React.FC = () => {
  return (
    <div className='h-screen w-screen bg-black'>
    <div className="container">
      <h1>Country Comparison</h1>
      <div className="divTable">
        <div className="row">
          <div className="header">Category</div>
          <div className="header">Canada</div>
          <div className="header">Australia</div>
          <div className="header">New Zealand</div>
        </div>
        <div className="row">
          <div className="header">Capital</div>
          <div className="cell">Ottawa</div>
          <div className="cell">Canberra</div>
          <div className="cell">Wellington</div>
        </div>
        <div className="row">
          <div className="header">Largest City</div>
          <div className="cell">Toronto</div>
          <div className="cell">Sydney</div>
          <div className="cell">Auckland</div>
        </div>
        <div className="row">
          <div className="header">Regions</div>
          <div className="cell">10 provinces (Alberta, Ontario, Québec) + 3 territories (Yukon)</div>
          <div className="cell">6 states (NSW, Victoria, WA) + 3 territories</div>
          <div className="cell">16 regions (Auckland, Canterbury, Otago)</div>
        </div>
        <div className="row">
          <div className="header">Location</div>
          <div className="cell">Northern North America</div>
          <div className="cell">Oceania (continent)</div>
          <div className="cell">Southwest Pacific (Oceania)</div>
        </div>
        <div className="row">
          <div className="header">Highest Mountain</div>
          <div className="cell">Mount Logan (5,959 m)</div>
          <div className="cell">Mount Kosciuszko (2,228 m)</div>
          <div className="cell">Aoraki/Mount Cook (3,724 m)</div>
        </div>
        <div className="row">
          <div className="header">Largest Lake</div>
          <div className="cell">Lake Superior (82,100 km≤)</div>
          <div className="cell">Lake Eyre (9,500 km≤)</div>
          <div className="cell">Lake TaupŇć (616 km≤)</div>
        </div>
        <div className="row">
          <div className="header">Flag</div>
          <div className="cell">Red maple leaf on white background</div>
          <div className="cell">Southern Cross with Commonwealth Star</div>
          <div className="cell">Southern Cross with silver fern</div>
        </div>
        <div className="row">
          <div className="header">National Symbols</div>
          <div className="cell">Beaver, maple leaf, Crown Jewels</div>
          <div className="cell">Kangaroo, golden wattle, Opera House</div>
          <div className="cell">Kiwi, silver fern, haka</div>
        </div>
        <div className="row">
          <div className="header">National Anthem</div>
          <div className="cell">"O Canada"</div>
          <div className="cell">"Advance Australia Fair"</div>
          <div className="cell">"God Defend New Zealand"</div>
        </div>
        <div className="row">
          <div className="header">Population (2025)</div>
          <div className="cell">~40.5 million</div>
          <div className="cell">~27.1 million</div>
          <div className="cell">~5.3 million</div>
        </div>
        <div className="row">
          <div className="header">Longest River</div>
          <div className="cell">Mackenzie (4,241 km)</div>
          <div className="cell">Murray (2,508 km)</div>
          <div className="cell">Waikato (425 km)</div>
        </div>
        <div className="row">
          <div className="header">Head of State</div>
          <div className="cell">King Charles III (represented by Governor General Mary Simon)</div>
          <div className="cell">King Charles III (represented by Governor General Samantha Mostyn)</div>
          <div className="cell">King Charles III (represented by Governor General Cindy Kiro)</div>
        </div>
        <div className="row">
          <div className="header">Head of Government</div>
          <div className="cell">Pierre Poilievre (Conservative, since 10/2025)</div>
          <div className="cell">Anthony Albanese (Labor, until 5/2025 elections)</div>
          <div className="cell">Christopher Luxon (National Party)</div>
        </div>
        <div className="row">
          <div className="header">Government Type</div>
          <div className="cell">Federal constitutional monarchy</div>
          <div className="cell">Federal constitutional monarchy</div>
          <div className="cell">Unitary constitutional monarchy</div>
        </div>
        <div className="row">
          <div className="header">Currency</div>
          <div className="cell">Canadian Dollar (CAD)</div>
          <div className="cell">Australian Dollar (AUD)</div>
          <div className="cell">New Zealand Dollar (NZD)</div>
        </div>
        <div className="row">
          <div className="header">Famous Personalities</div>
          <div className="cell">Justin Trudeau, Céline Dion, Ryan Reynolds</div>
          <div className="cell">Hugh Jackman, Margot Robbie, Tim Minchin</div>
          <div className="cell">Taika Waititi, Lorde, Jacinda Ardern</div>
        </div>
        <div className="row">
          <div className="header">National Sport</div>
          <div className="cell">Ice hockey</div>
          <div className="cell">Cricket</div>
          <div className="cell">Rugby</div>
        </div>
        <div className="row">
          <div className="header">Official Languages</div>
          <div className="cell">English, French</div>
          <div className="cell">English</div>
          <div className="cell">English, MńĀori</div>
        </div>
        <div className="row">
          <div className="header">Geography</div>
          <div className="cell">Arctic plains, Rocky Mountains, taiga</div>
          <div className="cell">Outback deserts, Great Dividing Range</div>
          <div className="cell">Alpine ranges, geothermal zones</div>
        </div>
        <div className="row">
          <div className="header">National Parks</div>
          <div className="cell">Banff, Jasper, Yukon Wilderness</div>
          <div className="cell">Kakadu, Uluru-Kata Tjuta, Great Barrier Reef</div>
          <div className="cell">Fiordland, Tongariro, Abel Tasman</div>
        </div>
        <div className="row">
          <div className="header">Landmarks</div>
          <div className="cell">Niagara Falls, CN Tower, Vancouver Island</div>
          <div className="cell">Sydney Opera House, Bondi Beach, Uluru</div>
          <div className="cell">Hobbiton, Rotorua geysers, Sky Tower</div>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 2rem;
          margin: 0 auto;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #121212;
          color: #e0e0e0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          letter-spacing: -0.5px;
        }
        
        .divTable {
          display: table;
          width: 100%;
          max-width: 1200px;
          border-collapse: separate;
          border-spacing: 0;
          margin: 20px 0;
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .row {
          display: table-row;
          transition: background-color 0.2s ease;
        }
        
        .row:hover .cell {
          background-color: #2c2c2c;
        }
        
        .header {
          display: table-cell;
          font-weight: 600;
          padding: 16px 24px;
          background: linear-gradient(90deg, #2b5876 0%, #4e4376 100%);
          color: #ffffff;
          text-align: left;
          border-bottom: 1px solid #333;
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        
        .cell {
          display: table-cell;
          padding: 16px 24px;
          background: #222222;
          color: #e0e0e0;
          text-align: left;
          border-bottom: 1px solid #333;
          font-size: 0.95rem;
          line-height: 1.5;
          transition: background-color 0.2s ease;
        }
        
        .divTable .row:nth-child(even) .cell {
          background: #262626;
        }
        
        .divTable .row:last-child .cell,
        .divTable .row:last-child .header {
          border-bottom: none;
        }
        
        /* First column styling */
        .row .header:first-child {
          font-weight: 700;
          min-width: 150px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .header, .cell {
            padding: 12px 16px;
            font-size: 0.9rem;
          }
          
          h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
    </div>
  );
}

export default Test