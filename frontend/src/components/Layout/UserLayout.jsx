import React, { useState } from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet } from 'react-router-dom';
import FeedbackForm from '../feedbackForm';
import FAQs from '../Faqs';

const UserLayout = () => {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openFaqs, setOpenFaqs] = useState(false);

  // Feedback handlers
  const openFeedbackHandler = () => setOpenFeedback(true);
  const closeFeedbackHandler = () => setOpenFeedback(false);

  // FAQs handlers
  const openFaqsHandler = () => setOpenFaqs(true);
  const closeFaqsHandler = () => setOpenFaqs(false);

  return (
    <>
      <Header openFeedback={openFeedback} />

      <main>
        <Outlet />
      </main>

      {/* Footer receives both handlers */}
      <Footer 
        openFeedback={openFeedbackHandler} 
        openFaqs={openFaqsHandler} 
      />

      {/* Backdrops */}
      {openFeedback && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeFeedbackHandler}
        />
      )}

      {openFaqs && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={closeFaqsHandler}
        />
      )}

      {/* Drawers */}
      <FeedbackForm
        drawerOpen={openFeedback}
        toggleDrawer={closeFeedbackHandler}
      />

      <FAQs
        drawerOpen={openFaqs}
        toggleDrawer={closeFaqsHandler}
      />
    </>
  );
};

export default UserLayout;
