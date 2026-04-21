import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Terms and Conditions</h1>

        <section className="space-y-6 text-gray-800 leading-relaxed text-justify">
          <p>
            Welcome to <strong>ReWear</strong>! These Terms and Conditions ("Terms") govern your access to and use of our website, mobile application, and services. Please read them carefully before using our platform.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">1. Use of the Platform</h2>
            <p>
              ReWear is designed to facilitate the exchange, donation, and purchase of second-hand clothing. By using our platform, you agree to use it lawfully and ethically, without violating the rights of others.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate, up-to-date, and complete account information.</li>
              <li>Use respectful language and behavior toward other users.</li>
              <li>Do not post misleading listings, inappropriate content, or illegal items.</li>
              <li>Report any suspicious or abusive behavior to ReWear administrators.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">3. Return & Swap Policy</h2>
            <p>
              All transactions made on ReWear are considered final unless otherwise specified. We do not offer return or refund services unless a product is significantly different from its description.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">4. Content and Intellectual Property</h2>
            <p>
              All trademarks, logos, text, and images on ReWear are the intellectual property of their respective owners. You may not reuse any content without prior permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">5. Limitation of Liability</h2>
            <p>
              ReWear is not responsible for any direct or indirect damages, including but not limited to lost profits, data loss, or personal harm resulting from interactions on our platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">6. Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. We will notify users of significant changes through the platform or email. Your continued use of ReWear constitutes your agreement to the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-2">7. Contact Us</h2>
            <p>
              For questions or concerns about these Terms, please contact us at <a href="mailto:support@rewear.com" className="text-indigo-600 hover:underline">support@rewear.com</a>.
            </p>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-10 border-t pt-4">
          Last updated: July 25, 2025
        </footer>
      </div>
    </div>
  );
};

export default Terms;
