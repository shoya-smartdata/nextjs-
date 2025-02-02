import React, { useState } from "react";
import { useSpring, animated } from "react-spring"; // Importing react-spring
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa"; // Icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Spring animations
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 220, friction: 60 },
  });

  const textFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
    config: { tension: 200, friction: 50 },
  });

  const formFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 600,
    config: { tension: 200, friction: 60 },
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission (e.g., send the data to an API)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <animated.div style={fadeIn} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We would love to hear from you. Please reach out with any questions or feedback.
          </p>
        </animated.div>

        {/* Contact Information Section */}
        <animated.div style={textFade} className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaMapMarkerAlt className="text-4xl text-blue-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Our Location</h3>
            <p className="mt-2 text-lg text-gray-600">123 Main Street, Cityville, USA</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaEnvelope className="text-4xl text-green-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Email Us</h3>
            <p className="mt-2 text-lg text-gray-600">contact@ourcompany.com</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <FaPhone className="text-4xl text-orange-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Call Us</h3>
            <p className="mt-2 text-lg text-gray-600">(123) 456-7890</p>
          </div>
        </animated.div>

        {/* Contact Form Section */}
        <animated.div style={formFade} className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Send Us a Message</h2>

          {submitted && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
              <p>Your message has been sent! We'll get back to you shortly.</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-6 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </animated.div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Find Us Here</h2>
          <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.749655503866!2d-73.99279718436095!3d40.7306107793287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ab09845717%3A0x80a19d3fa1407e2c!2sNew%20York%2C%20NY%2010012!5e0!3m2!1sen!2sus!4v1642711914252!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
