import React from "react";

const Terms = () => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Please read these terms carefully before using ReWear.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8">

          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-green-600">ReWear</span>! 
            These Terms govern your access and use of our platform. 
            By using ReWear, you agree to follow these guidelines responsibly.
          </p>

          {/* SECTION */}
          <Section title="1. Use of the Platform">
            ReWear allows users to exchange, donate, and purchase second-hand clothing.
            You must use the platform ethically and lawfully.
          </Section>

          <Section title="2. User Responsibilities">
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate and updated account details.</li>
              <li>Maintain respectful behavior.</li>
              <li>Avoid misleading or illegal listings.</li>
              <li>Report suspicious activities.</li>
            </ul>
          </Section>

          <Section title="3. Return & Swap Policy">
            All transactions are final unless an item differs significantly from its description.
          </Section>

          <Section title="4. Content & Ownership">
            All logos, text, and images belong to their respective owners.
            Unauthorized use is prohibited.
          </Section>

          <Section title="5. Limitation of Liability">
            ReWear is not responsible for damages, losses, or issues arising from user interactions.
          </Section>

          <Section title="6. Updates to Terms">
            We may update these terms anytime. Continued use means acceptance.
          </Section>

          <Section title="7. Contact Us">
            For any queries, contact us at{" "}
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
    <div className="text-gray-600 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

export default Terms;