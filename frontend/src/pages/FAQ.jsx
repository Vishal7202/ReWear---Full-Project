import React from 'react';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Frequently Asked Questions (FAQs)</h1>

        <section className="space-y-8 text-gray-800 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Q. What is ReWear?</h2>
            <p>
              ReWear is a community-driven platform where people can donate, exchange, or request second-hand clothing to promote sustainability and help others.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Q. Is it free to use ReWear?</h2>
            <p>
              Yes! Listing and browsing items are completely free. You may earn Karma Points through activities like donating clothes or completing exchanges.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Q. How do I donate clothes?</h2>
            <p>
              Head to the Donate section, fill out the short form, and schedule a pickup or drop-off at one of our centers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Q. What are Karma Points?</h2>
            <p>
              Karma Points are rewards earned by helping the community — like donating clothes. You can use them to unlock premium features or priority listings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">Q. Can I track my donations?</h2>
            <p>
              Yes, your donation history and impact report will be available in your profile under "My Donations."
            </p>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-10 border-t pt-4">
          Need more help? Contact us at <a href="mailto:support@rewear.com" className="text-indigo-600 hover:underline">support@rewear.com</a>
        </footer>
      </div>
    </div>
  );
};

export default FAQ;
