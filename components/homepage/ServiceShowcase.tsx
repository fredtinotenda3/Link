import Link from "next/link";
import { SERVICES } from "@/constants/services";

export default function ServiceShowcase() {
  // Use first 3 services for showcase
  const showcaseServices = SERVICES.slice(0, 3);

  return (
    <section className="py-20 bg-linear-to-b from-[#001F3F] to-[#0E2433]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-[#B9C4CC] max-w-2xl mx-auto">
            Comprehensive eye care solutions with same-day service and expert
            care
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {showcaseServices.map((service) => (
            <div key={service.id} className="card-premium text-center group">
              <div className="text-5xl mb-6">{service.icon}</div>

              <h3 className="text-2xl font-bold text-[#F2F5F9] mb-4">
                {service.title}
              </h3>

              <p className="text-[#B9C4CC] mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 mb-6">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-sm text-[#B9C4CC]"
                  >
                    <span className="w-2 h-2 bg-[#00A6E6] rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>

              <Link href="/services" className="btn-primary w-full">
                {service.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-secondary text-lg px-8 py-4">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
