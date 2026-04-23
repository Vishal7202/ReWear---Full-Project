import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Your privacy matters to us at ReWear 🌱
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-6 text-gray-700 leading-relaxed">

          <p>
            At <span className="font-semibold text-green-600">ReWear</span>, we are committed to protecting your personal information and being transparent about how we use it. 
            This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe.
          </p>

          {/* SECTION */}
          <Section title="1. Information We Collect">
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email, and account details</li>
              <li>Items you upload, browse, or request</li>
              <li>Activity data such as interactions and preferences</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve our platform</li>
              <li>To connect users for clothing exchange</li>
              <li>To communicate updates, notifications, and support</li>
            </ul>
          </Section>

          <Section title="3. Data Security">
            We use secure technologies and practices to protect your data. 
            However, no system is 100% secure, so we encourage safe usage.
          </Section>

          <Section title="4. Sharing Your Information">
            We do <span className="font-semibold">not sell your data</span>. 
            We may share limited information with trusted services (like delivery or hosting) to run the platform.
          </Section>

          <Section title="5. Your Rights">
            You have the right to:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access or update your data</li>
              <li>Request deletion of your account</li>
              <li>Contact us for any privacy concerns</li>
            </ul>
          </Section>

          <Section title="6. Updates to This Policy">
            We may update this Privacy Policy occasionally. Continued use of ReWear means you agree to the updated terms.
          </Section>

          <Section title="7. Contact Us">
            For any questions, contact us at{" "}
            <a
              href="mailto:support@rewear.com"
              className="text-green-600 font-medium hover:underline"
            >
              support@rewear.com
            </a>
          </Section>

          {/* FOOTER */}
          <div className="text-center text-gray-400 text-sm border-t pt-4">
            Last updated: July 2025
          </div>

        </div>
      </div>
    </div>
  );
};

/* 🔥 REUSABLE SECTION */
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h2>
    <div className="text-sm text-gray-600 leading-relaxed">
      {children}
    </div>
  </div>
);

export default PrivacyPolicy;