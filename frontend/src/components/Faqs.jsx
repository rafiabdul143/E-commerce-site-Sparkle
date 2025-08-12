
import React from 'react';

const FAQs = ({ drawerOpen, toggleDrawer }) => {
  return (

<> {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={toggleDrawer}
        ></div>
      )}
   
    <div
  className={`fixed bottom-0 right-0 h-[500px] w-[400px] mb-5 bg-white shadow-lg backdrop-blur-sm z-50 transform transition-transform duration-300 ${
    drawerOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
  }`}
>
  {/* Inner container with padding and rounded corners */}
  <div className="flex flex-col h-full p-4 rounded-lg shadow-2xl overflow-hidden">
    
    {/* Header */}
    <div className="flex justify-between items-center px-4 py-2 border-b ml-5 bg-slate-300">
      <h2 className="text-lg font-semibold text-gray-950 ml-5">Frequently Asked Questions</h2>
      <button onClick={toggleDrawer} className="text-gray-600  hover:text-red-600">
        ✕
      </button>
    </div>


      {/* FAQs Content */}
    <div className="p-6 max-w-2xl mx-auto ml-5 mb-5 bg-white rounded shadow overflow-y-auto h-[calc(100%-60px)]">

 
      <ul className="space-y-4">
        <li>
          <strong>Q: What technologies do you use?</strong>
          <p>A: We use React, Tailwind CSS, Node.js, and more.</p>
        </li>
        <li>
          <strong>Q: How can I contact support?</strong>
          <p>A: Email us at support@example.com.</p>
        </li>
        <li>
          <strong>Q: Where are you located?</strong>
          <p>A: We are based in India.</p>
        </li>
        <li>
          <strong>Q: What is your return policy?</strong>
          <p>A: You can return products within 30 days of purchase.</p>
        </li>
        <li>
          <strong>Q: Do you offer international shipping?</strong>
          <p>A: Yes, we ship to select international locations.</p>
        </li>
        <li>
          <strong>Q: Can I track my order?</strong>
          <p>A: Yes, you will receive a tracking number once your order ships.</p>
        </li>
        <li>
          <strong>Q: What payment methods do you accept?</strong>
          <p>A: We accept credit cards, PayPal, and bank transfers.</p>
        </li>
        <li>
          <strong>Q: How long does shipping take?</strong>
          <p>A: Shipping typically takes 5-7 business days.</p>
        </li>
        <li>
          <strong>Q: Do you have a loyalty program?</strong>
          <p>A: Yes, we offer a loyalty program with exclusive discounts.</p>
        </li>
        <li>
          <strong>Q: Can I change my order after it's placed?</strong>
          <p>A: Changes can be made within 1 hour of placing the order.</p>
        </li>
        <li>
          <strong>Q: What should I do if I receive a damaged item?</strong>
          <p>A: Contact us immediately for a replacement or refund.</p>
        </li>
        <li>
          <strong>Q: Do you provide gift wrapping?</strong>
          <p>A: Yes, we offer gift wrapping for an additional fee.</p>
        </li>
        <li>
          <strong>Q: How can I unsubscribe from your newsletter?</strong>
          <p>A: Click the unsubscribe link at the bottom of our emails.</p>
        </li>
        <li>
          <strong>Q: Do you have a physical store?</strong>
          <p>A: Currently, we operate online only.</p>
        </li>
        <li>
          <strong>Q: How can I reset my password?</strong>
          <p>A: Use the "Forgot Password" link on the login page.</p>
        </li>
        <li>
          <strong>Q: Can I pay in installments?</strong>
          <p>A: Yes, we offer financing options at checkout.</p>
        </li>
        <li>
          <strong>Q: Are your products eco-friendly?</strong>
          <p>A: Yes, we prioritize sustainable materials and practices.</p>
        </li>
        <li>
          <strong>Q: What is your privacy policy?</strong>
          <p>A: You can read our privacy policy on our website.</p>
        </li>
        <li>
          <strong>Q: Can I leave a review for a product?</strong>
          <p>A: Yes, reviews can be submitted on the product page.</p>
        </li>
        <li>
          <strong>Q: Do you offer discounts for bulk purchases?</strong>
          <p>A: Yes, please contact us for bulk pricing options.</p>
        </li>
        <li>
          <strong>Q: What happens if my package is lost?</strong>
          <p>A: We will investigate and provide a replacement if necessary.</p>
        </li>
        <li>
          <strong>Q: Can I order by phone?</strong>
          <p>A: Yes, you can place orders by calling our support line.</p>
        </li>
        <li>
          <strong>Q: Do you offer personalized products?</strong>
          <p>A: Yes, we have options for customizations on select items.</p>
        </li>
        <li>
          <strong>Q: How do I report a problem with my order?</strong>
          <p>A: Contact our customer service team for assistance.</p>
        </li>
        <li>
          <strong>Q: What should I do if I forgot my username?</strong>
          <p>A: Use the "Forgot Username" feature on the login page.</p>
        </li>
        <li>
          <strong>Q: Is there a minimum order amount?</strong>
          <p>A: No, there is no minimum order requirement.</p>
        </li>
        <li>
          <strong>Q: Can I change my delivery address?</strong>
          <p>A: You can change it before the order is dispatched.</p>
        </li>
        <li>
          <strong>Q: Do you offer student discounts?</strong>
          <p>A: Yes, students can get a discount with valid ID.</p>
        </li>
        <li>
          <strong>Q: How do I contact your sales team?</strong>
          <p>A: You can reach our sales team via the contact form on our website.</p>
        </li>
        <li>
          <strong>Q: What is your warranty policy?</strong>
          <p>A: Most products come with a one-year warranty.</p>
        </li>
        <li>
          <strong>Q: Can I pre-order items?</strong>
          <p>A: Yes, pre-orders are available for select upcoming products.</p>
        </li>
        <li>
          <strong>Q: How do I leave feedback about my experience?</strong>
          <p>A: We welcome feedback through our contact form or social media.</p>
        </li>
        <li>
          <strong>Q: Are there any hidden fees?</strong>
          <p>A: No, all fees are clearly stated at checkout.</p>
        </li>
        <li>
          <strong>Q: How do I join your affiliate program?</strong>
          <p>A: You can apply through the affiliate section on our website.</p>
        </li>
        <li>
          <strong>Q: What if I receive the wrong item?</strong>
          <p>A: Contact us for a return and replacement.</p>
        </li>
        <li>
          <strong>Q: Can I save items for later?</strong>
          <p>A: Yes, you can add items to your wishlist.</p>
        </li>
        <li>
          <strong>Q: What if I have a question not listed here?</strong>
          <p>A: Feel free to reach out to our support team for assistance.</p>
        </li>
        <li>
          <strong>Q: Do you have a referral program?</strong>
          <p>A: Yes, refer a friend and earn rewards!</p>
        </li>
        <li>
          <strong>Q: How often do you restock items?</strong>
          <p>A: We restock popular items regularly, so check back often!</p>
        </li>
        <li>
          <strong>Q: Can I view my order history?</strong>
          <p>A: Yes, you can view your order history in your account.</p>
        </li>
        <li>
          <strong>Q: Do you offer free samples?</strong>
          <p>A: Free samples are available for select products.</p>
        </li>
        <li>
          <strong>Q: What should I do if I have a technical issue?</strong>
          <p>A: Contact our tech support team for assistance.</p>
        </li>
        <li>
          <strong>Q: Can I schedule a delivery time?</strong>
          <p>A: Yes, you can select a preferred delivery time at checkout.</p>
        </li>
        <li>
          <strong>Q: What are your business hours?</strong>
          <p>A: We are open Monday to Friday, 9 AM to 5 PM.</p>
        </li>
        <li>
          <strong>Q: Do you have a mobile app?</strong>
          <p>A: Yes, our mobile app is available for download on iOS and Android.</p>
        </li>
        <li>
          <strong>Q: Can I opt for express shipping?</strong>
          <p>A: Yes, express shipping options are available at checkout.</p>
        </li>
        <li>
          <strong>Q: What is your policy on price matching?</strong>
          <p>A: We will match competitors' prices on identical items.</p>
        </li>
        <li>
          <strong>Q: Can I purchase a gift card?</strong>
          <p>A: Yes, gift cards are available for purchase on our website.</p>
        </li>
        <li>
          <strong>Q: How do I contact your marketing team?</strong>
          <p>A: You can reach out via the contact form on our website.</p>
        </li>
        <li>
          <strong>Q: Do you have a blog?</strong>
          <p>A: Yes, we publish articles on our blog regularly.</p>
        </li>
        <li>
          <strong>Q: How can I stay updated on new products?</strong>
          <p>A: Subscribe to our newsletter for the latest updates.</p>
        </li>
        <li>
          <strong>Q: What if I have a complaint?</strong>
          <p>A: Please contact our customer service team to resolve any issues.</p>
        </li>
      </ul>
    </div>
    </div>
    </div>
    </>
  );
};
export default FAQs;

