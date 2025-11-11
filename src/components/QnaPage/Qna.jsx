import React, { useState } from "react";
import Navbar from "../header/Navbar";
import Footer from "../Footer/Footer";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Local Food Lovers Network?",
    answer:
      "It's a community-driven platform where people can share, review, and explore local food experiences, recipes, and restaurants from around their area.",
  },
  {
    question: "How can I post a food review?",
    answer:
      "Simply sign up or log in, go to the 'Add Review' section, upload your photo, share your thoughts, and submit. Your review will appear for others to see!",
  },
  {
    question: "Is it free to use this platform?",
    answer:
      "Yes! Local Food Lovers Network is completely free to use. You can explore, post, and connect with other food lovers without any cost.",
  },
  {
    question: "Can I edit or delete my reviews later?",
    answer:
      "Absolutely. You can easily edit or delete your reviews anytime from your profile section.",
  },
  {
    question: "How do I discover nearby food spots?",
    answer:
      "You can browse by location or search for restaurants and dishes shared by others near your area using our interactive map and search options.",
  },
];

const Qna = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="py-16 text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <HelpCircle className="text-green-600 w-10 h-10" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Have questions about Local Food Lovers Network? Find your answers below 🍽️
        </p>
      </section>

      {/* FAQ Section */}
      <section className="flex-1 px-6 md:px-20 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-green-800 font-semibold text-lg focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="text-green-600 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-green-600 w-6 h-6" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-700 border-t border-green-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Qna;
