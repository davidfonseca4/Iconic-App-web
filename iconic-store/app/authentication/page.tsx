export default function AuthenticationPage() {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-[#060606] text-white selection:bg-amber-500/30">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-6 uppercase">Legal & Info</p>
        <h1 className="font-playfair text-4xl md:text-6xl mb-12">Authentication Process</h1>
        
        <div className="font-dm-mono text-white/60 text-sm md:text-base leading-loose space-y-8">
          <p>
            At ICONIC, the integrity of our inventory is our highest priority. Every artifact that enters our vault undergoes a rigorous, multi-stage authentication process before it is ever presented to our collectors.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">1. Provenance Verification</h3>
          <p>
            The first step in our process is tracing the lineage of the item. We require documented proof of ownership dating back to the original creator or the significant event in question. This often includes original receipts, photographic evidence, and legal affidavits.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">2. Material & Forensic Analysis</h3>
          <p>
            Our network of appraisers includes experts in textiles, metallurgy, and document forensics. We analyze the materials to ensure they are consistent with the era and the known habits of the historical figure. This may involve carbon dating, ink analysis, and weave pattern recognition.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">3. Third-Party Certification</h3>
          <p>
            We do not rely solely on our internal team. High-profile artifacts are submitted to independent, globally recognized authentication bodies (such as PSA/DNA, JSA, or Sotheby&apos;s appraisal experts) for an objective secondary verification.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">4. The ICONIC Certificate</h3>
          <p>
            Once an item passes all stages, it is sealed and paired with the ICONIC Certificate of Authenticity. This document is cryptographically logged and features physical anti-counterfeit measures, ensuring your investment is indisputable.
          </p>
        </div>
      </div>
    </div>
  );
}
