import Navigation from "@/components/Navigation";
// ✅ Specific constant imports
import { BRANCHES } from "@/constants/branches";
import { CONTACT_METHODS, FAQS } from "@/constants/contact";
// ✅ Specific type imports
import { Branch, ContactMethod, FAQ } from "@/types";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-br from-[#001F3F] via-[#002851] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-[#F2F5F9]">Get In</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00A6E6] to-[#48CAE4]">
                Touch
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-[#B9C4CC] mb-8 leading-relaxed">
              We&apos;re here to help with all your eye care needs. Reach out to
              us through any channel and experience our commitment to
              exceptional service.
            </p>

            {/* Quick Contact Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">5</div>
                <div className="text-sm text-[#B9C4CC]">Branches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">24h</div>
                <div className="text-sm text-[#B9C4CC]">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">All</div>
                <div className="text-sm text-[#B9C4CC]">Medical Aids</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#00A6E6]">
                  Walk-ins
                </div>
                <div className="text-sm text-[#B9C4CC]">Welcome</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Choose the method that works best for you. We&apos;re ready to
              assist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONTACT_METHODS.map((method: ContactMethod, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                  {method.title}
                </h3>
                <p className="text-[#B9C4CC] text-sm mb-3">
                  {method.description}
                </p>
                <p className="text-[#00A6E6] font-semibold text-sm mb-4">
                  {method.details}
                </p>
                <a
                  href={method.action}
                  className="btn-primary text-sm py-2 px-4 inline-block"
                >
                  {method.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Branch Info */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F2F5F9]">
                Send Us a Message
              </h2>
              <p className="text-[#B9C4CC] mb-8">
                Have questions about our services? Need help with an
                appointment? Fill out the form below and we&apos;ll get back to
                you promptly.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F2F5F9] font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F9] font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="+263 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Preferred Branch
                  </label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors">
                    <option value="">Select a branch</option>
                    {BRANCHES.map((branch: Branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#F2F5F9] font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#F2F5F9] focus:outline-none focus:border-[#00A6E6] transition-colors"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Branch Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#F2F5F9]">
                Branch Contact Details
              </h2>
              <p className="text-[#B9C4CC] mb-8">
                Find contact information for all our locations across Zimbabwe.
              </p>

              <div className="space-y-6">
                {BRANCHES.map((branch: Branch) => (
                  <div
                    key={branch.id}
                    className="bg-white/5 rounded-xl p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-bold text-[#F2F5F9] mb-3">
                      {branch.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">📍</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">📞</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[#00A6E6]">📧</span>
                        <span className="text-[#B9C4CC] text-sm">
                          {branch.name.toLowerCase().replace(/\s+/g, "-")}
                          @linkoptical.co.zw
                        </span>
                      </div>

                      <div className="border-t border-white/10 pt-3 mt-3">
                        <p className="text-[#F2F5F9] font-medium mb-2">
                          🕐 Hours
                        </p>
                        <div className="text-sm text-[#B9C4CC] space-y-1">
                          <div className="flex justify-between">
                            <span>Mon - Fri:</span>
                            <span>{branch.hours.weekdays}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span>{branch.hours.saturday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>{branch.hours.sunday}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button className="btn-primary text-sm py-2 px-4 flex-1">
                          Call Branch
                        </button>
                        <button className="btn-secondary text-sm py-2 px-4">
                          Directions
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
        <div className="container-premium">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {FAQS.map((faq: FAQ, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold text-[#F2F5F9] mb-3">
                  {faq.question}
                </h3>
                <p className="text-[#B9C4CC] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-r from-[#001F3F] to-[#0077B6]">
        <div className="container-premium">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Improve Your Vision?
            </h2>
            <p className="text-xl text-[#B9C4CC] mb-8">
              Don&apos;t wait to experience better vision. Contact us today and
              take the first step toward clearer sight.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                📞 Call Us Now
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                📍 Visit Branch
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                💬 WhatsApp
              </button>
            </div>

            <p className="text-[#B9C4CC] text-sm mt-4">
              Emergency eye care available • All medical aids accepted •
              Family-friendly service
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
