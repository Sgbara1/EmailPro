import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <div id="contact" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Contact Us</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Get in Touch
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Have questions or need support? We're here to help!
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div className="p-8 sm:p-10 lg:flex-auto">
          <div className="flex items-center gap-x-4">
            <EnvelopeIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            <h3 className="text-lg font-semibold leading-8 text-gray-900">Email Support</h3>
          </div>
          <p className="mt-4 text-base leading-7 text-gray-600">
            For technical support or general inquiries:
            <a href="mailto:support@aireply.example.com" className="ml-2 text-indigo-600 hover:text-indigo-500">
              support@aireply.example.com
            </a>
          </p>
          <div className="mt-6 space-y-4 text-sm leading-6 text-gray-600">
            <p>• Technical issues and troubleshooting</p>
            <p>• Account and billing questions</p>
            <p>• Feature requests and feedback</p>
            <p>• Partnership inquiries</p>
          </div>
        </div>
      </div>
    </div>
  );
}