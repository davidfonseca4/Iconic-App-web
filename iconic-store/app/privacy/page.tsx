export default function PrivacyPage() {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-[#060606] text-white selection:bg-amber-500/30">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-6 uppercase">Legal & Info</p>
        <h1 className="font-playfair text-4xl md:text-6xl mb-12">Privacy Policy</h1>
        
        <div className="font-dm-mono text-white/60 text-sm md:text-base leading-loose space-y-8">
          <p>
            ICONIC is committed to protecting the privacy and security of our exclusive clientele. This policy outlines how we collect, use, and safeguard your personal information.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Information Collection</h3>
          <p>
            We collect personal information necessary to facilitate high-value transactions. This includes your name, secure delivery address, contact details, and financial verification documents. We do not store payment card details on our servers; these are handled by our encrypted banking partners.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Anonymity & Discretion</h3>
          <p>
            We understand that many of our collectors prefer anonymity. We will never publicly disclose the identity of a buyer or the location of an artifact without explicit, written consent. Your acquisitions remain entirely confidential.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Data Security</h3>
          <p>
            Our databases utilize military-grade encryption to protect your information from unauthorized access. Access to client data is strictly limited to essential logistics and concierge personnel.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Third-Party Disclosure</h3>
          <p>
            We do not sell, trade, or transfer your personal information to outside parties. Exceptions are made only for trusted logistics partners executing the secure delivery of your acquisition, and only the information absolutely necessary for that delivery is shared.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Your Rights</h3>
          <p>
            You have the right to request access to, modification of, or deletion of your personal data stored in our systems at any time, subject to legal and transactional record-keeping requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
