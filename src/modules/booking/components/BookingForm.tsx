"use client";
import { useState } from "react";
import { PageHero } from "@/modules/content/components/PageHero";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (
      !fd.get("fname") ||
      !fd.get("lname") ||
      !fd.get("email") ||
      !fd.get("service")
    ) {
      alert("Please complete all required fields.");
      return;
    }
    if (!fd.get("consent")) {
      alert("Please tick the consent checkbox.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const inputClass =
    "w-full h-[22px] max-md:h-8 text-[11px] max-md:text-[13px] bg-white text-black outline-none px-1 max-md:px-2 border-2 border-t-[#515e6e] border-l-[#515e6e] border-r-[#f0ede1] border-b-[#f0ede1] focus:border-[#0054e3] focus:border-r-[#9ec1f0] focus:border-b-[#9ec1f0]";

  return (
    <>
      <PageHero
        title="Book a Consultation"
        subtitle="Free 30-Minute Initial Meeting"
        showLogo
      />
      <div className="px-6 max-md:px-4 py-4 max-md:py-3">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 max-md:flex-col mb-2.5">
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                First Name <span className="text-red-600 font-normal">*</span>
              </label>
              <input name="fname" className={inputClass} placeholder="John" />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                Last Name <span className="text-red-600 font-normal">*</span>
              </label>
              <input name="lname" className={inputClass} placeholder="Smith" />
            </div>
          </div>
          <div className="flex gap-3 max-md:flex-col mb-2.5">
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                Email <span className="text-red-600 font-normal">*</span>
              </label>
              <input
                name="email"
                type="email"
                className={inputClass}
                placeholder="john@example.com.au"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="04XX XXX XXX"
              />
            </div>
          </div>
          <div className="mb-2.5">
            <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
              Business Name
            </label>
            <input
              name="business"
              className={inputClass}
              placeholder="Your business name"
            />
          </div>
          <div className="flex gap-3 max-md:flex-col mb-2.5">
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                Service <span className="text-red-600 font-normal">*</span>
              </label>
              <select name="service" className={inputClass + " cursor-pointer"}>
                <option value="">— Select —</option>
                <option>Individual Tax Return</option>
                <option>Business Tax & BAS</option>
                <option>Accounting & Bookkeeping</option>
                <option>Business Advisory & Consuting</option>
                <option>Payroll & Employee Service</option>
                <option>Business Setup</option>
                <option>Accounting & Software Setup</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
                Preferred Date
              </label>
              <input name="date" type="date" className={inputClass} />
            </div>
          </div>
          <div className="mb-2.5">
            <label className="block text-[11px] max-md:text-xs text-black font-bold mb-0.5">
              Message
            </label>
            <textarea
              name="message"
              className="w-full h-[70px] max-md:h-20 text-[11px] max-md:text-[13px] bg-white text-black outline-none p-1 max-md:p-2 resize-y border-2 border-t-[#515e6e] border-l-[#515e6e] border-r-[#f0ede1] border-b-[#f0ede1] focus:border-[#0054e3] focus:border-r-[#9ec1f0] focus:border-b-[#9ec1f0]"
              placeholder="Tell us about your situation..."
            />
          </div>
          <label className="flex items-start gap-1 text-[11px] max-md:text-xs text-[#333] cursor-pointer mb-3">
            <input type="checkbox" name="consent" className="mt-0.5 mr-1" />I
            consent to Wealon Tax & Accounting contacting me regarding my
            enquiry.
          </label>
          <div className="flex gap-1.5 mt-3.5">
            <button
              type="submit"
              className="min-w-[75px] h-[23px] max-md:h-8 text-[11px] max-md:text-[13px] font-bold px-3 border-2 border-[#003c74] rounded-sm cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, #fff, #dfe8f6 50%, #b8d4f0)",
              }}
            >
              Submit Enquiry
            </button>
            <button
              type="reset"
              className="min-w-[75px] h-[23px] max-md:h-8 text-[11px] max-md:text-[13px] px-3 border border-[#003c74] rounded-sm cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, #fff, #ece9d8 90%, #d6d2c2)",
              }}
            >
              Clear
            </button>
          </div>
          {submitted && (
            <div className="mt-2 p-2.5 bg-[#dff0d8] border border-[#68a54b] text-[#2d6a1e] rounded-sm text-[11px] max-md:text-xs">
              ✅ Thank you! We&apos;ll contact you within 1 business day.
            </div>
          )}
        </form>
      </div>
    </>
  );
}
