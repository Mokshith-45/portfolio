import React from 'react';

const Contact = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <h2 className="text-4xl font-bold text-green-400 text-center mb-12">Contact Me</h2>
      <div className="max-w-3xl mx-auto">
        <form className="bg-gray-900 p-8 rounded-xl shadow-lg flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
          <button className="px-6 py-3 bg-green-400 text-gray-900 font-semibold rounded-lg hover:bg-green-500 transition-all">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
