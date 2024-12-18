import React from 'react';

const steps = [
  {
    id: '01',
    name: 'Install Extension',
    description: 'Add our Chrome extension to your browser with just one click.',
  },
  {
    id: '02',
    name: 'Configure API Key',
    description: 'Enter your OpenAI API key in the extension settings.',
  },
  {
    id: '03',
    name: 'Open Email',
    description: 'Navigate to the email you want to reply to in Gmail.',
  },
  {
    id: '04',
    name: 'Generate Reply',
    description: 'Click the extension icon, choose your tone, and generate a response.',
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Start using AI replies in 4 simple steps
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 text-center lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="mx-auto max-w-xl lg:mx-0">
                <div className="flex items-center justify-center">
                  <div className="rounded-full bg-indigo-600 p-3 text-white">
                    {step.id}
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900">
                  {step.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}