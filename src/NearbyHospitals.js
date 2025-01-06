import React, { useState } from 'react';

const NearbyHospitals = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon });
    reverseGeocode(lat, lon);
    getNearbyHospitals(lat, lon);
  };

  const reverseGeocode = (lat, lon) => {
    const apiKey = '6393bd0035c343f1b97bf1fc62aa41e3';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const address = data.results[0].formatted;
          setAddress(address);
        } else {
          alert("No address found for these coordinates.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert("Error fetching location.");
      });
  };

  const getNearbyHospitals = (lat, lon) => {
    const radius = 8000;
    const query = `
        [out:json];
        (
            node["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
            node["amenity"="clinic"](around:${radius}, ${lat}, ${lon});
        );
        out body;
    `;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        setHospitals(data.elements);
      })
      .catch(error => {
        console.error('Error fetching hospitals:', error);
        setError('Error fetching hospitals.');
      });
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'url(/aihospital)', // Reference the image in public folder
        backgroundSize: 'cover',  // Ensures image covers the screen
        backgroundPosition: 'center', // Centers the background
        backgroundAttachment: 'fixed', // Keeps the background fixed while scrolling
      }}
    >
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10 opacity-90">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Find Nearby Hospitals</h2>
        
        <button
          onClick={handleGetLocation}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Nearby Hospitals
        </button>

        {address && (
          <div className="mt-4 text-gray-700">
            <p><strong>Address:</strong> {address}</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {hospitals.length > 0 && (
          <ul className="mt-6 space-y-4">
            {hospitals.map(hospital => {
              const name = hospital.tags.name || 'Unnamed Hospital/Clinic';
              const emergencyNumber = hospital.tags.emergency || 'No emergency number available';
              const distance = haversineDistance(location.lat, location.lon, hospital.lat, hospital.lon).toFixed(2);

              return (
                <li
                  key={hospital.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-semibold text-gray-800">{name}</p>
                      <p className="text-sm text-gray-500">Emergency: {emergencyNumber}</p>
                    </div>
                    <span className="text-sm text-gray-600">{distance} km</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;
