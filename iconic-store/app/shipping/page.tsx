export default function ShippingPage() {
  return (
    <div className="pt-40 pb-32 min-h-screen bg-[#060606] text-white selection:bg-amber-500/30">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <p className="font-dm-mono text-amber-500 text-xs tracking-[0.3em] mb-6 uppercase">Legal & Info</p>
        <h1 className="font-playfair text-4xl md:text-6xl mb-12">Shipping & Returns</h1>
        
        <div className="font-dm-mono text-white/60 text-sm md:text-base leading-loose space-y-8">
          <p>
            Due to the irreplaceable nature of our inventory, standard shipping methods are not applicable to ICONIC acquisitions. We employ a specialized logistics network to ensure the safe transfer of history.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">White-Glove Delivery</h3>
          <p>
            All artifacts are transported via private, insured couriers. Items are secured in climate-controlled, tamper-evident archival cases. A dedicated ICONIC representative will accompany high-value acquisitions to oversee the final handover at your designated secure location.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">International Acquisitions</h3>
          <p>
            We ship globally. However, international collectors are responsible for any import duties, taxes, or customs delays. Our legal team will assist with the necessary cultural heritage export documentation required for certain historical pieces.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Return Policy</h3>
          <p>
            Given the authenticated nature of our items, all sales are considered final upon transfer of custody. Returns are strictly prohibited unless a legally binding challenge to the item&apos;s authenticity is proven within 30 days of acquisition by a mutually agreed-upon independent expert.
          </p>

          <h3 className="text-xl text-white font-playfair mt-12 mb-4">Insurance</h3>
          <p>
            From the moment the item leaves the ICONIC Vault until it is physically signed for by you or your authorized representative, it is insured for 100% of its purchase value by our global underwriting partners.
          </p>
        </div>
      </div>
    </div>
  );
}
