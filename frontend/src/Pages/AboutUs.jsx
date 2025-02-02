import React from "react";
import { useSpring, animated } from "react-spring"; // Importing react-spring
import { FaRegBuilding, FaUsers, FaClipboardList } from "react-icons/fa"; // Icons

const AboutUs = () => {
  // Animations for section fades
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 220, friction: 60 },
  });

  // Animations for individual text
  const textFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
    config: { tension: 200, friction: 40 },
  });

  const statsFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
    config: { tension: 180, friction: 50 },
  });

  const teamFade = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1500,
    config: { tension: 150, friction: 40 },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1 - Company Overview */}
        <animated.div style={fadeIn} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">
            About Us
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We are passionate about creating exceptional products and services
            that make a positive impact.
          </p>
        </animated.div>

        {/* Section 2 - Our Story */}
        <animated.div style={textFade} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Our Story
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Founded in 2020, we began with a mission to revolutionize the
            industry through innovative solutions. We aim to bring the best of
            technology and creativity to every project we take on.
          </p>
        </animated.div>

        {/* Section 3 - Company Stats */}
        <animated.div style={statsFade} className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <FaRegBuilding className="text-6xl text-blue-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Years in Business</h3>
            <p className="mt-2 text-xl text-gray-600">5+ Years of Experience</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <FaUsers className="text-6xl text-green-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Team Members</h3>
            <p className="mt-2 text-xl text-gray-600">100+ Dedicated Team Members</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <FaClipboardList className="text-6xl text-orange-600 mx-auto" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-800">Completed Projects</h3>
            <p className="mt-2 text-xl text-gray-600">500+ Successful Projects</p>
          </div>
        </animated.div>

        {/* Section 4 - Our Team */}
        <animated.div style={teamFade}>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="flex justify-center space-x-8">
            {/* Example team member 1 */}
            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Example team member 2 */}
            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Lead Designer</p>
            </div>
            {/* Example team member 3 */}
            <div className="text-center">
              <img
                src="https://randomuser.me/api/portraits/men/68.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 font-semibold text-gray-800">Michael Brown</h3>
              <p className="text-gray-600">CTO</p>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default AboutUs;
