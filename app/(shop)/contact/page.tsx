"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Have questions about our fragrances? We are here to help you find your signature scent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="bg-gray-50 p-10 rounded-lg space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-sm text-gray-400">Mon-Sat 9am to 6pm</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Email</h3>
              <p className="text-gray-600">support@moonlight.com</p>
              <p className="text-sm text-gray-400">We reply within 24 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Studio</h3>
              <p className="text-gray-600">
                123, Moonlight Avenue,<br />
                Indore, Madhya Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (Visual Only for now) */}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2">Name</label>
            <input type="text" className="w-full border p-4 rounded focus:outline-none focus:border-black transition" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2">Email</label>
            <input type="email" className="w-full border p-4 rounded focus:outline-none focus:border-black transition" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-xs uppercase text-gray-500 mb-2">Message</label>
            <textarea rows={4} className="w-full border p-4 rounded focus:outline-none focus:border-black transition" placeholder="How can we help?"></textarea>
          </div>
          <button className="bg-black text-white px-10 py-4 w-full uppercase tracking-widest text-xs hover:bg-gray-800 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}