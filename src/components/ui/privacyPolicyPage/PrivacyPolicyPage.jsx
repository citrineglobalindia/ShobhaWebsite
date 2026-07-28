"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  // Animation variants for smooth entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-24 pb-20 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-5 lg:px-8 font-sans">
          {/* --- BREADCRUMB / BACK LINK --- */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Home
            </Link>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* --- HEADER --- */}
            <motion.div
              variants={itemVariants}
              className="mb-12 border-b border-gray-100 pb-8"
            >
              <div className="flex items-center gap-3 mb-4 text-[#C5A059]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Privacy Policy – WAY TO NEST
              </h1>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-[#C5A059] rounded-full"></span>
                <p className="text-sm text-gray-500 font-medium">
                  Last updated: 03/02/2026
                </p>
              </div>
            </motion.div>

            {/* --- CONTENT --- */}
            <div className="space-y-12 leading-relaxed text-[15px] md:text-[16px] text-gray-600">
              {/* Introduction */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 text-lg text-gray-800 font-medium"
              >
                <p>
                  WAY TO NEST (“we”, “us”, “our”) operates this website (the
                  “Site”) as an authorised channel partner for Sobha Limited. We
                  respect your privacy and are committed to protecting the
                  personal information you share with us.
                </p>
                <p>
                  By using this Site and submitting your information through our
                  lead forms, you agree to the practices described in this
                  Privacy Policy.
                </p>
              </motion.div>

              {/* 1. Information We Collect */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    1
                  </span>
                  Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information that you voluntarily provide when you
                  fill out a lead form, contact form, or otherwise communicate
                  with us. This may include:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 mb-6 pl-2">
                  {[
                    "Name",
                    "Phone number",
                    "Email address",
                    "City/Location",
                    "Project of interest",
                    "Any other information you choose to share in message boxes",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 bg-[#C5A059] rounded-full shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-4">
                  We may also automatically collect certain technical
                  information when you visit the Site, such as:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 mb-4 pl-2">
                  {[
                    "IP address",
                    "Browser type and version",
                    "Device type",
                    "Pages visited and time spent on the Site",
                    "Referring website/source",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 italic bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block text-sm">
                  This technical data is collected through cookies and similar
                  technologies.
                </p>
              </motion.section>

              {/* 2. How We Use Your Information */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    2
                  </span>
                  How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information collected for the following purposes:
                </p>
                <ul className="space-y-3 pl-2">
                  {[
                    "To respond to your enquiries and provide information about Sobha projects and related services",
                    "To schedule site visits, calls, or meetings as requested",
                    "To share brochures, price sheets, offers, and project updates",
                    "To improve our website, marketing campaigns, and customer experience",
                    "To comply with legal and regulatory obligations",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full ring-2 ring-[#C5A059]/30 bg-[#C5A059]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* 3. Our Role as Authorised Channel Partner */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    3
                  </span>
                  Our Role as Authorised Channel Partner
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <p className="mb-4">
                    WAY TO NEST is an authorised channel partner for Sobha
                    Limited.
                  </p>
                  <p className="mb-4">
                    We market and facilitate enquiries for Sobha projects. The
                    information you submit on this Site may be shared with
                    Sobha’s authorised representatives solely for the purposes
                    described in this Privacy Policy (for example, to coordinate
                    follow-up, site visits, or project-related communication).
                  </p>
                  <div className="flex items-start gap-3 p-3 bg-[#C5A059]/10 text-[#8E7035] rounded-lg text-sm font-semibold">
                    <Lock className="w-5 h-5 shrink-0" />
                    We are an independent channel partner and this is not the
                    official website of Sobha Limited.
                  </div>
                </div>
              </motion.section>

              {/* 4. Sharing of Information */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    4
                  </span>
                  Sharing of Information
                </h2>
                <p className="mb-4">
                  We may share your personal information with:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-gray-400">
                  <li>
                    Sobha Limited and its authorised sales or CRM teams,
                    strictly for handling your enquiry
                  </li>
                  <li>
                    Our service providers (such as CRM platforms, email/SMS
                    gateways, analytics and hosting providers) who assist us in
                    operating this Site and contacting you
                  </li>
                  <li>
                    Government authorities or law enforcement agencies, when
                    required by applicable law, regulation, or legal process
                  </li>
                </ul>
                <p className="font-medium text-gray-900">
                  We do not sell or rent your personal information to third
                  parties for their independent marketing purposes.
                </p>
              </motion.section>

              {/* 5. Cookies and Tracking Technologies */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    5
                  </span>
                  Cookies and Tracking Technologies
                </h2>
                <p className="mb-4">
                  We may use cookies, pixels, and similar tracking technologies
                  to:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-gray-400">
                  <li>Understand how visitors use our Site</li>
                  <li>Measure the performance of our marketing campaigns</li>
                  <li>Improve content, design, and user experience</li>
                </ul>
                <p>
                  You can control or delete cookies through your browser
                  settings. However, disabling cookies may affect certain
                  features of the Site.
                </p>
              </motion.section>

              {/* 6. Data Security */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    6
                  </span>
                  Data Security
                </h2>
                <p className="mb-4">
                  We take reasonable technical and organisational measures to
                  protect your personal information from unauthorised access,
                  disclosure, alteration, or destruction.
                </p>
                <p>
                  However, no method of transmission over the internet or
                  electronic storage is completely secure, and we cannot
                  guarantee absolute security.
                </p>
              </motion.section>

              {/* 7. Data Retention */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    7
                  </span>
                  Data Retention
                </h2>
                <p className="mb-4">
                  We retain your personal information for as long as necessary
                  to:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-gray-400">
                  <li>Fulfil the purposes outlined in this Privacy Policy</li>
                  <li>
                    Comply with legal, regulatory, or reporting requirements
                  </li>
                  <li>Resolve disputes and enforce our agreements</li>
                </ul>
                <p>
                  When information is no longer needed, we will delete or
                  anonymise it in a reasonable manner.
                </p>
              </motion.section>

              {/* 8. Your Rights */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    8
                  </span>
                  Your Rights
                </h2>
                <p className="mb-4">
                  Subject to applicable laws, you may have the right to:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-gray-400">
                  <li>Access the personal information we hold about you</li>
                  <li>
                    Request correction or updating of inaccurate or incomplete
                    information
                  </li>
                  <li>
                    Request deletion of your personal information, where legally
                    permitted
                  </li>
                  <li>Withdraw consent to receive marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the details
                  in the “Contact Us” section below. We may need to verify your
                  identity before processing your request.
                </p>
              </motion.section>

              {/* 9. Third-Party Links */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    9
                  </span>
                  Third-Party Links
                </h2>
                <p>
                  Our Site may contain links to third-party websites or external
                  pages (for example, maps, payment gateways, or social media).
                  We are not responsible for the privacy practices or content of
                  those websites. We encourage you to review their privacy
                  policies separately.
                </p>
              </motion.section>

              {/* 10. Children’s Privacy */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    10
                  </span>
                  Children’s Privacy
                </h2>
                <p>
                  Our services are not intended for individuals under the age of
                  18. We do not knowingly collect personal information from
                  minors. If you believe that a child has provided information
                  on our Site, please contact us so we can remove it.
                </p>
              </motion.section>

              {/* 11. Changes to This Privacy Policy */}
              <motion.section variants={itemVariants}>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    11
                  </span>
                  Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, legal requirements, or services. The
                  revised version will be posted on this page with an updated
                  “Last updated” date. We encourage you to review this page
                  periodically.
                </p>
              </motion.section>

              {/* 12. Contact Us */}
              <motion.section
                variants={itemVariants}
                className="mt-16 pt-8 border-t border-gray-100"
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C5A059] text-sm font-bold text-white">
                    12
                  </span>
                  Contact Us
                </h2>
                <p className="mb-8 text-gray-600">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our handling of your personal
                  information, please contact:
                </p>

                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-gray-100 relative overflow-hidden group hover:border-[#C5A059]/30 transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#C5A059]/10 transition-colors"></div>

                  <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-widest border-b border-gray-100 pb-4 inline-block">
                    WAY TO NEST PVT LTD
                  </h3>

                  <div className="space-y-6 text-sm md:text-base relative z-10">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Email
                        </span>
                        <a
                          href="mailto:info@waytonest.in"
                          className="text-gray-900 font-medium hover:text-[#C5A059] transition-colors"
                        >
                          info@waytonest.in
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Phone
                        </span>
                        <a
                          href="tel:+919739612117"
                          className="text-gray-900 font-medium hover:text-[#C5A059] transition-colors"
                        >
                          +91 97396 12117
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                          Address
                        </span>
                        <address className="not-italic text-gray-700 leading-relaxed font-medium">
                          3478, Bhaskara polyclinic, 2nd cross, 80 feet Road,{" "}
                          <br className="hidden md:block" />
                          Kanakapura Main Rd, near vajrahalli, opposite to BDA
                          park, <br className="hidden md:block" />
                          Raghuvanahalli, Bengaluru, Karnataka 560109
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;
