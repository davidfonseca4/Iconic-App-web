export default function TermsPage() {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-[#060606] text-white selection:bg-amber-500/30">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-6 uppercase">Legal & Info</p>
        <h1 className="font-playfair text-4xl md:text-6xl mb-12">Terms of Service</h1>
        
        <div className="font-dm-mono text-white/60 text-sm md:text-base leading-loose space-y-8">
          <p>
            By accessing and using the ICONIC Store, you agree to be bound by the following terms and conditions. These terms govern your use of our platform and the acquisition of our curated artifacts.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">1. Eligibility</h3>
          <p>
            You must be at least 18 years of age to make an acquisition through ICONIC. By placing an order, you warrant that you are legally capable of entering into binding contracts.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">2. Pricing and Availability</h3>
          <p>
            All prices are listed in Euros (EUR). Due to the unique nature of our artifacts, availability is strictly limited to one unit per item. Adding an item to your cart does not reserve it; a piece is only secured once payment is successfully processed.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">3. Intellectual Property</h3>
          <p>
            The acquisition of a physical artifact does not transfer any intellectual property, copyright, or reproduction rights associated with the item or its original creator. You are purchasing the physical object only.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">4. Limitation of Liability</h3>
          <p>
            ICONIC provides historical context and descriptions to the best of our knowledge. We are not liable for any discrepancies in historical interpretation. Our liability is strictly limited to the purchase price of the artifact.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">5. Modifications</h3>
          <p>
            We reserve the right to update these terms at any time. Continued use of the platform following any changes constitutes your acceptance of the new terms.
          </p>
        </div>
      </div>
    </div>
  );
}
