import React from 'react';

const Features = () => {
  const features = [
    "Responsive Design",
    "Fast Performance",
    "Secure and Reliable",
    "Customizable UI",
    "24/7 Support"
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Features</h2>
      <ul className="list-disc pl-5 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
