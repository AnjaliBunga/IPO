import '../App.css';
import { useNavigate } from 'react-router-dom';
import ipodata from '../data/ipodata';

function IPO() {
  const navigate = useNavigate();

  return (
    <>
    <div>
        <div className="ipo-table">
      <div className="ipo-header">
        <div>Company / Issue date</div>
        <div>Issue size</div>
        <div>Price range</div>
        <div>Min invest / qty</div>
      </div>
      {ipodata.map((ipo) => (
            <div
              key={ipo.id}
              className="ipo-row"
              onClick={() => navigate(`/ipo/${ipo.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="company-box"
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <img
                  src={ipo.logo}
                  alt={ipo.companyName}
                  className="company-logo"
                  width="40"
                />
          <div className="company">
            <h3>{ipo.companyName}</h3>
            <p>{ipo.issueDates}</p>
          </div>
            </div>

          <div className="bold">{ipo.issueSize}</div>

          <div className="bold">{ipo.priceRange}</div>

          <div className="min-invest">
            <span className="bold">{ipo.minimumAmount}</span>
            <span>{ipo.lotSize}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
}

export default IPO;


