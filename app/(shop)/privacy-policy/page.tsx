export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-gray-800">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10 text-center uppercase tracking-widest">Last Updated: January 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to Moonlight. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">2. The Data We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">3. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>To process and deliver your order.</li>
            <li>To manage our relationship with you (notifying you about changes to our terms or privacy policy).</li>
            <li>To improve our website, products/services, marketing, customer relationships and experiences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>support@moonlight.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}