export default function FAQ() {
  const faqs = [
    {
      question: "How do I make a reservation?",
      answer:
        "You can make a reservation by searching for your desired destination and dates on our homepage, selecting a hotel, and following the booking process.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Our cancellation policy varies depending on the hotel and rate type. Please check the specific terms and conditions for your booking before confirming your reservation.",
    },
    {
      question: "How can I modify my booking?",
      answer:
        "You can modify your booking by logging into your account and accessing your reservations. If you need assistance, please contact our customer support team.",
    },
    // Add more FAQs as needed
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

