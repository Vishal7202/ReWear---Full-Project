import React from 'react';
import { Shirt, HandHeart, Users, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png'; // make sure alias '@' is configured correctly

const Home = () => {
  const team = [
    { name: 'Yash', img: 'https://media.licdn.com/dms/image/v2/D4E03AQEBsvfja4CTKA/profile-displayphoto-scale_100_100/B4EZg954xGHIAo-/0/1753385243113?e=1756339200&v=beta&t=TnhzOBPFu4wMkeSNtc648pDG5yKuuWxQ5ZMbUWqbsqA' },
    { name: 'Shankar', img: 'https://media.licdn.com/dms/image/v2/D5603AQEUkCiqIvlCaA/profile-displayphoto-shrink_800_800/B56ZdkMopDHoAc-/0/1749732723872?e=1756339200&v=beta&t=Cpt6SgidgjjUX-Ku8R5p3jXUXWlJPcWmgnN_N8pnE9g' },
    { name: 'Vijay', img: 'https://media.licdn.com/dms/image/v2/D4D03AQGls-P3ioX7Lg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1664381705405?e=1756339200&v=beta&t=eM7klWLhQFidbwaiPUS_OkPtx61lK6K7yMbIp0rkR3U' },
    { name: 'Umesh', img: 'https://media.licdn.com/dms/image/v2/D4D03AQH4xz6dONY9oQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728656128634?e=1756339200&v=beta&t=r9Pe0iyFzFdnn2WqWJVDBW25bTZAo_LpypI7iAQ8-ao' },
  ];

  const partners = [
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      name: 'Flipkart',
      logo: 'https://tse2.mm.bing.net/th/id/OIP.idB_-eo5pNgOG8Ker3jEpgHaEK?pid=Api&P=0&h=180',
    },
    {
      name: 'Myntra',
      logo: 'https://tse1.mm.bing.net/th/id/OIP.wIVwNTcN_4v5qzO8saP2vwHaCU?pid=Api&P=0&h=180',
    },
    {
      name: 'Ajio',
      logo: 'https://tse2.mm.bing.net/th/id/OIP.CvuQ5mppnKVcq-aPYfYS7QHaE8?pid=Api&P=0&h=180',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex-1 space-y-6">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start md:items-start">
            <img
              src={logo}
              alt="ReWear Logo"
              className="w-20 h-20 rounded-full shadow-lg border border-gray-300 mb-4"
            />
            <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
              ReWear
            </h1>
            <p className="text-indigo-500 text-lg font-medium">
              Give Clothes a Second Life
            </p>
          </div>

          {/* Description & CTA */}
          <p className="text-lg text-gray-600 max-w-xl">
            Join a trusted community to exchange, donate, and reuse clothes effortlessly with AI-powered recommendations.
          </p>
          <div className="flex gap-4">
            <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
              Explore Clothes
            </Link>
            <Link to="/upload" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 transition">
              Upload Your Clothes
            </Link>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1"
          whileHover={{ scale: 1.02 }}
        >
          <img 
            src="https://media.istockphoto.com/id/513184879/photo/brand-new-interior-of-cloth-store.jpg?s=612x612&w=0&k=20&c=0mHtoCZgoUFa_GCh5QPBhLBDssnqBwOs0pMAIXNiJ3Y=" 
            alt="Sustainable fashion" 
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          <Feature icon={<Shirt />} title="Upload Items" desc="List your clothes quickly and securely for the community." />
          <Feature icon={<HandHeart />} title="Donate Freely" desc="Support NGOs and those in need with your donations." />
          <Feature icon={<Users />} title="Community" desc="Connect with eco-conscious individuals and build your network." />
          <Feature icon={<Bot />} title="Smart Match AI" desc="Get AI-driven personalized clothing swap recommendations." />
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        className="py-20 bg-white px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">About ReWear</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            ReWear is a community-driven platform that bridges fashion and sustainability.
            Our AI-powered platform connects people to donate, exchange, or reuse clothes—
            reducing textile waste while helping communities in need.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <section className="bg-indigo-50 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-4 rounded-xl shadow"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
                <h4 className="text-indigo-700 font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-500">Team Member</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-10">Supported By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center">
            {partners.map((partner, i) => (
              <motion.img
                key={i}
                src={partner.logo}
                alt={partner.name}
                className="mx-auto h-12 grayscale hover:grayscale-0 transition duration-300"
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <motion.section 
        className="max-w-7xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Ready to join the movement?</h2>
        <Link 
          to="/login" 
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </motion.section>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
    whileHover={{ scale: 1.05 }}
  >
    <div className="mx-auto mb-4 w-12 h-12 text-indigo-600">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default Home;
