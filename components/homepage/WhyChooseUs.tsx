// components/homepage/WhyChooseUs.tsx - REFACTORED VERSION
import { COMPANY_VALUES, CERTIFICATIONS } from "@/constants/company";
import { BRANCH_FEATURES } from "@/constants/services";

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#002851]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About Our Services
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Information about our eye care services in Zimbabwe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_VALUES.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
            >
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {value.title}
              </h3>
              <p className="text-[#B9C4CC] text-sm">{value.description}</p>
            </div>
          ))}

          {BRANCH_FEATURES.map((feature, index) => (
            <div
              key={index + COMPANY_VALUES.length}
              className="text-center p-6 bg-white/5 rounded-xl border border-white/10 group hover:bg-white/10 transition-all"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-[#F2F5F9] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#B9C4CC] text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badges from CERTIFICATIONS */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold text-[#F2F5F9] mb-6">
              Our Memberships
            </h3>
            <div className="flex flex-wrap justify-center gap-6 opacity-80">
              {CERTIFICATIONS.map((certification, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">✓</div>
                  <div className="text-sm text-[#B9C4CC] max-w-[120px]">
                    {certification}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
