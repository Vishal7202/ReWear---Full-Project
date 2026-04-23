import React, { useState } from "react";

const faqs = [
  {
    q: "What is ReWear?",
    a: "ReWear is a community-driven platform where users exchange, donate, and request pre-loved clothing to promote sustainability.",
  },
  {
    q: "Is it free to use ReWear?",
    a: "Yes! Listing and browsing are free. You earn points by contributing to the community.",
  },
  {
    q: "How do I donate clothes?",
    a: "Upload your item with details, and users can request it. You can arrange delivery or meet locally.",
  },
  {
    q: "What are ReWear Points?",
    a: "Points are rewards you earn for uploads and exchanges. Use them to request clothes.",
  },
  {
    q: "Can I track my activity?",
    a: "Yes, your dashboard shows your listings, requests, and activity history.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Everything you need to know about ReWear
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl shadow-sm overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">
                  {faq.q}
                </span>

                <span className="text-green-600 text-xl">
                  {active === index ? "-" : "+"}
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`px-6 transition-all duration-300 ${
                  active === index ? "max-h-40 pb-4" : "max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-sm mt-10">
          Need help?{" "}
          <a
            href="mailto:support@rewear.com"
            className="text-green-600 font-medium hover:underline"
          >
            support@rewear.com
          </a>
        </div>

      </div>
    </div>
  );
};

export default FAQ;