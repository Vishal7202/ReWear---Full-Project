import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#f5e6ca] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white/30 dark:bg-white/10 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-10 transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4">
          Return & Exchange Policy
        </h1>

        <section className="space-y-8 text-gray-800 dark:text-gray-100 leading-relaxed text-justify text-lg">
          <p>
            At <strong>ReWear</strong>, we strive to make every exchange, donation, or sale a positive experience. Since most items are pre-loved, our return and exchange policy is designed to be fair and transparent for both parties.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <FaTimesCircle /> 1. Final Sales
            </h2>
            <p className="mt-2">
              All clothing items donated or exchanged are considered final sale. We encourage users to carefully review listings before making a request.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <FaCheckCircle /> 2. Refund Eligibility
            </h2>
            <p className="mt-2 mb-2">Refunds will only be issued if:</p>
            <ul className="list-none space-y-2 ml-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span>The item received is significantly different from the description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span>The item was never shipped after 7 working days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                <span>The product is damaged beyond wearability (excluding disclosed issues)</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <FaInfoCircle /> 3. Requesting a Return
            </h2>
            <p className="mt-2">
              To request a return or refund, contact our support team within 3 days of receiving your item at{' '}
              <a href="mailto:support@rewear.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                support@rewear.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-300 flex items-center gap-2">
              <FaTimesCircle /> 4. Non-Returnable Items
            </h2>
            <p className="mt-2">
              Items marked as “Final Donation” or heavily discounted are not eligible for return or refund under any condition.
            </p>
          </div>
        </section>

        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10 border-t pt-4">
          Last updated: July 25, 2025
        </footer>
      </div>
    </div>
  );
};

export default ReturnPolicy;
