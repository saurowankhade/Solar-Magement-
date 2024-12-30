// FAQ.js
const FAQ = ({ faqData }) => {
    return (
      <section id="faq" className="py-9 flex flex-col  items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
          <p className="mt-4 text-gray-600">Everything you need to know.</p>
        </div>
        <div className="mt-12 space-y-8 px-6 md:px-12">
          {faqData.map((faq, index) => (
            <div key={index} className="lg:w-[700px]">
              <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FAQ;
  