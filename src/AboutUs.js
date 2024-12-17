import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="bg-purple-900 text-white w-full py-10 shadow-md">
        <h1 className="text-center text-4xl font-bold tracking-wide">About Us</h1>
      </div>
      <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white mt-8 p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">Who We Are</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to our AI Healthcare platform! We are dedicated to improving
          healthcare accessibility for everyone, especially for individuals in
          rural and underserved areas. By leveraging advanced Artificial Intelligence,
          we aim to make medical advice accessible, accurate, and personalized.
          Our system supports multi-lingual input to ensure inclusivity, catering to
          diverse communities in their native languages.
        </p>

        <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Features</h2>
        <ul className="list-disc pl-6 text-gray-700 text-lg leading-relaxed">
          <li className="mb-2">
            <strong>Medical Advice:</strong> Provide accurate and instant medical advice based on symptoms.
          </li>
          <li className="mb-2">
            <strong>Nearby Hospitals:</strong> Locate nearby hospitals and clinics for urgent medical attention.
          </li>
          <li className="mb-2">
            <strong>Multi-Lingual Input:</strong> Interact in multiple languages including Urdu, Punjabi, and Saraiki.
          </li>
          <li className="mb-2">
            <strong>Emergency Contacts:</strong> Quickly access emergency contact information to ensure timely help.
          </li>
        </ul>

        <h2 className="text-3xl font-bold text-purple-900 mt-6 mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our mission is to revolutionize healthcare accessibility using
          AI-driven solutions. We strive to bridge the gap between medical
          expertise and underserved communities, ensuring no one is left behind
          when it comes to their health and well-being.
        </p>

        <h2 className="text-3xl font-bold text-purple-900 mt-6 mb-4">Why Choose Us?</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We combine cutting-edge AI with user-friendly features to deliver a
          healthcare experience that is fast, reliable, and inclusive. Our
          platform is built with empathy, innovation, and a commitment to saving lives.
        </p>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 bg-purple-900 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
