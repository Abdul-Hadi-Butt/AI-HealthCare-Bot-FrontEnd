import React, { useState } from 'react';
import './NearbyHospitals.css'; // For custom styles

const NearbyHospitals = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [patientRecordVisible, setPatientRecordVisible] = useState(false);
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  const togglePatientRecord = () => {
    setPatientRecordVisible(!patientRecordVisible);
  };

  const fetchEmergencyNumbers = (province) => {
    const numbers = [
      { name: 'Emergency Services', contact: '1122' },
      { name: 'Local Hospital', contact: '042-37661110' },
      { name: 'Doctor', contact: '(+92)3034844244' },
    ];
    if (province === 'Sindh') {
      numbers.push({ name: 'Chippa Emergency', contact: '1022' });
    } else {
      numbers.push({ name: `Emergency numbers in ${province} may vary.`, contact: '' });
    }
    setEmergencyNumbers(numbers);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          reverseGeocode(latitude, longitude);
          fetchNearbyHospitals(latitude, longitude);
        },
        () => alert('Error fetching location.')
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const reverseGeocode = (lat, lon) => {
    const apiKey = '6393bd0035c343f1b97bf1fc62aa41e3'; // Replace with your actual API key
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`)
      .then((res) => res.json())
      .then(({ results }) => {
        if (results.length > 0) {
          fetchEmergencyNumbers(results[0].components.province);
        } else {
          alert('No address found for these coordinates.');
        }
      })
      .catch(() => alert('Error fetching location details.'));
  };

  const fetchNearbyHospitals = (lat, lon) => {
    const radius = 5000;
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
        node["amenity"="clinic"](around:${radius}, ${lat}, ${lon});
      );
      out body;
    `;
    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(({ elements }) => {
        setNearbyHospitals(elements);
        setModalOpen(true);
      })
      .catch(() => alert('Error fetching nearby hospitals.'));
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="nearby-hospitals">
      <nav className="navbar">
        <div className="user-info">
          <img src="HADI.jpg" alt="User DP" className="user-dp" />
          <span>Hi, Abdul Hadi</span>
        </div>
        <div className="nav-links">
          <a href="#">User Profile</a>
          <a href="#">About Us</a>
          <a href="#">Logout</a>
        </div>
      </nav>

      <div className="content">
        <aside className="sidebar">
          <div className="patient-record">
            <button onClick={togglePatientRecord}>Patient Record</button>
            {patientRecordVisible && (
              <div>
                <p>Medical History:</p>
                <ul>
                  <li>Disease 1: Asthma</li>
                  <li>Disease 2: Allergies</li>
                  <li>Disease 3: Diabetes</li>
                </ul>
              </div>
            )}
          </div>

          <div className="emergency-numbers">
            <h2>Emergency Numbers</h2>
            {emergencyNumbers.map((number, index) => (
              <p key={index}>
                {number.name}: {number.contact}
              </p>
            ))}
          </div>
        </aside>

        <main className="main-content">
          <h2>Chat with our AI Healthcare Bot</h2>
          <div className="chatbox">
            <div className="chat-messages">
              <div className="chat-bubble bot-bubble">Hello! How can I assist you today?</div>
              <div className="chat-bubble user-bubble">I have a headache and feel dizzy.</div>
              <div className="chat-bubble bot-bubble">
                Possible causes could be dehydration or tension headaches. Have you been drinking enough water?
              </div>
            </div>
            <input type="text" placeholder="Type your message..." />
          </div>
          <button onClick={handleGetLocation}>Get Nearby Hospitals</button>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Nearby Hospitals & Clinics</h2>
            <ul>
              {nearbyHospitals.length > 0 ? (
                nearbyHospitals.map((hospital, index) => (
                  <li key={index}>
                    {haversineDistance(
                      0, // Replace with user lat
                      0, // Replace with user lon
                      hospital.lat,
                      hospital.lon
                    ).toFixed(2)}{' '}
                    km - {hospital.tags.name || 'Unnamed'}
                  </li>
                ))
              ) : (
                <li>No hospitals or clinics found nearby.</li>
              )}
            </ul>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyHospitals;
