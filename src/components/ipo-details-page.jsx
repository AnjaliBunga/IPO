import '../App.css';
import { FileDown } from 'lucide-react';

import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ipodata from '../data/ipodata';

function IPODetailsPage() {
  const { ipoId } = useParams();
  const navigate = useNavigate();

  const ipo = ipodata.find((item) => item.id === ipoId);

  if (!ipo) {
    return (
      <div className="ipo-details-page">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <p>IPO not found.</p>
      </div>
    );
  }
  
  const {
    companyName,
    companyType,
    logo,
    issueSize,
    priceRange,
    minimumAmount,
    lotSize,
    issueDates,
    listedOn,
    listedPrice,
    listingGains,
    timeline,
    about,
  } = ipo;
  
  const isTBA = ipo.issueDates === 'To be announced';

  return (
    <div className="ipo-details-page">
      <div className="breadcrumb-nav">
        <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Market watch</span>
      </div>

      <div className="ipo-details-header">
        <div className="ipo-header-left">
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>

          <div className="ipo-details-company">
            <img src={logo} alt={companyName} className="company-logo" width="56" />
            <div>
              <h2>{companyName}</h2>
              <p>{companyType}</p>
            </div>
          </div>
        </div>

        <div className="ipo-header-actions">
          <div className="icon-pill" style={{backgroundColor: 'white'}}><FileDown size={26} /></div>
          <button className="apply-button">Apply now</button>
        </div>
      </div>

      <div className="ipo-details-card">
        <h3>IPO details</h3>
        <div className="ipo-details-grid">
          <div>
            <p className="label">Issue size</p>
            <p className="value">{issueSize}</p>
            <p className="sub-label">Issue dates</p>
            <p className="value">{issueDates}</p>
          </div>

          <div>
            <p className="label">Price range</p>
            <p className="value">{priceRange}</p>
            <p className="sub-label">Listed on</p>
            <p className="value">{listedOn || '—'}</p>
          </div>

          <div>
            <p className="label">Minimum amount</p>
            <p className="value">{minimumAmount}</p>
            <p className="sub-label">Listed price</p>
            <p className="value">{listedPrice || '—'}</p>
          </div>

          <div>
            <p className="label">Lot size</p>
            <p className="value">{lotSize}</p>
            <p className="sub-label">Listing gains</p>
            <p
              className="value"
              style={
                listingGains && listedPrice
                  ? parseInt(listingGains.replace('₹', '')) >
                    parseInt(listedPrice.replace('₹', ''))
                    ? { color: '#22c55e' }
                    : { color: '#ef4444' }
                  : { color: '#111827' }
              }
            >
              {listingGains || '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="ipo-details-card">
        <h3>IPO timeline</h3>
        <div className={` ${isTBA ? 'tba-line' : 'ipo-timeline'}`}>
        {[
  { title: 'Bidding starts', date: timeline?.biddingStart },
  { title: 'Bidding ends', date: timeline?.biddingEnd },
  { title: 'Allotment finalization', date: timeline?.allotment },
  { title: 'Refund initiation', date: timeline?.refund },
  { title: 'Demat transfer', date: timeline?.dematTransfer },
  { title: 'Listing date', date: timeline?.listingDate },
].map((item, index) => {  
  return (
    <div key={index} className="timeline-item">
      <div className={`${isTBA ?'disabled': 'timeline-icon'}`}>
        {isTBA ? '×' : '✓'}
      </div>
      <p className="timeline-title">{item.title}</p>
      <p className="timeline-date">{item.date || '—'}</p>
    </div>
  );
})}

        </div>
      </div>

      <div className="ipo-details-card">
        <h3 className="heading-desktop">About the company</h3>
        <h3 className="heading-mobile">{companyName}</h3>
        <AboutSection about={about} />
      </div>
    </div>
  );
}

export default IPODetailsPage;

function AboutSection({ about }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p className={`about-text ${expanded ? 'expanded' : 'clamped'}`}>{about}</p>
      <button className="read-more" onClick={() => setExpanded((s) => !s)}>
        {expanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}
