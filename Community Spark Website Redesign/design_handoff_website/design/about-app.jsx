const {Button:ABtn,SectionHead:AHead,FaqItem:AFaq} = window.CommunitySparkDesignSystem_6bcc19;

const EXPERIENCE=[
  {n:'01',t:'Setup & Presentation',d:'Experience supporting event preparation, décor placement, room presentation, signage, and the details that help an event feel organized and intentional.'},
  {n:'02',t:'Guest Experience & Hospitality',d:'A resident event should feel welcoming from the moment people arrive. Community Spark prioritizes clear flow, thoughtful touchpoints, and approachable hospitality.'},
  {n:'03',t:'On-Site Coordination',d:'Event-day support includes keeping timelines moving, communicating with vendors and property staff, solving small issues quickly, and protecting the guest experience.'}
];
const FAQS=[
  ['What does "starting at" pricing mean?','The amount shown covers the base version of a preset event. Final pricing may change based on the event date, location, duration, staffing, delivery requirements, selected add-ons, vendor availability, and customization.'],
  ['Can a preset event be customized?','Yes. Preset events provide a clear starting structure, but décor, activities, entertainment, food service, prizes, staffing, and other details can be adjusted to fit the community and budget.'],
  ['Is catered food included in the starting price?','No, unless a specific event description clearly states otherwise. Catered food is treated as a third-party vendor pass-through expense. Community Spark can coordinate the order, schedule, delivery, and setup, while the client remains responsible for the vendor\u2019s final charges.'],
  ['Are add-on prices exact?','Community Spark-managed add-ons may be shown with planning estimates. Third-party services such as catering, DJs, entertainers, photographers, and specialty rentals are confirmed through current vendor quotes before booking.'],
  ['Can Community Spark work within a set budget?','Yes. Share the available budget and the elements that matter most. Community Spark can recommend an event concept and prioritize the strongest combination of inclusions within that amount.'],
  ['How far in advance should we inquire?','Earlier inquiries provide more flexibility for dates, vendors, and customization. An event date is not reserved until the proposal is approved and any stated booking requirements have been completed.'],
  ['What happens if an outdoor event is affected by weather?','Outdoor events should have a weather backup plan whenever possible. Community Spark will review the available indoor option, rescheduling possibilities, and any vendor limitations before the event is finalized.'],
  ['Can our property use its own vendors?','Possibly. Vendor responsibilities, timing, insurance, access, communication, and setup requirements must be agreed upon in advance so the event plan remains clear and manageable.'],
  ['Is sponsor support guaranteed?','No. Sponsor support depends on availability, brand fit, timing, and community approval. If no sponsor is secured, the property may continue with a sponsor-free version of the event at the approved price.'],
  ['Is resident information shared with sponsors?','No resident contact information is automatically provided to a sponsor. Any optional lead collection or resident sign-up must be clearly disclosed, voluntary, and approved by the apartment community in advance.'],
  ['Where does Community Spark provide events?','Community Spark is based in Indiana. Availability, travel requirements, and any travel-related charges are confirmed according to the property\u2019s location and the needs of the event.']
];
const POLICIES=[
  ['01','Starting Prices & Quotes','Website prices represent base event starting points. Community Spark will provide a written proposal showing the selected inclusions, add-ons, vendor expenses, responsibilities, and estimated total before booking.'],
  ['02','Booking & Date Confirmation','Submitting an inquiry does not reserve a date. The event is confirmed only after the proposal is approved and the booking requirements listed in the agreement have been completed.'],
  ['03','Vendor Pass-Through Costs','Catering and other third-party vendor charges are passed through to the client at the confirmed vendor amount. Community Spark coordination fees, when applicable, are listed separately for transparency.'],
  ['04','Changes & Cancellations','Event changes must be requested at least 7 calendar days before the event. Refunds: 21+ days prior — 100%; 8–20 days prior — 50%; 7 days or fewer — nonrefundable. Vendor cancellation fees pass through separately.'],
  ['05','Weather & Outdoor Events','The property should identify a backup location or approve a weather plan. Vendor availability, rental policies, and already-incurred expenses may affect rescheduling options.'],
  ['06','Property Access & Requirements','The client is responsible for providing accurate access times, loading information, venue rules, utility availability, parking details, and any property-specific insurance or vendor requirements.'],
  ['07','Community Partnerships','Sponsors require property approval. Sponsor support is not guaranteed, and participation must remain tasteful, relevant, and consistent with Community Spark\u2019s resident-first standards.'],
  ['08','Final Agreement','The event proposal and signed agreement control the final scope, pricing, payment schedule, responsibilities, cancellation terms, and service details for each booking.']
];

function AboutApp(){
  useReveal();
  return (
    <SiteShell active="About">
      <PageHero image="images/photo-5.jpg" eyebrow="About Community Spark"
        title="Events designed to help apartment communities feel more connected."
        lead="Community Spark was created to make resident events easier for property teams and more meaningful for the people who live there."
        actions={<React.Fragment><ABtn variant="primary" href="Events.html">Browse Events to Book</ABtn><ABtn variant="outline" href="Contact.html">Request a Custom Event</ABtn></React.Fragment>}
        proof={['Indiana-based','One point of contact','Resident-first standards']} />

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><AHead label="Meet the founder" title="A single point of contact from first email to breakdown." /></div>
          <div className="cs-founder" data-reveal style={{marginTop:'36px'}}>
            <div className="cs-founder-profile">
              <div className="cs-founder-initials">GN</div>
              <div className="cs-founder-role">Founder</div>
              <div className="cs-founder-name">Griffin Newton</div>
            </div>
            <div>
              <p className="cs-founder-bio">Indiana-based event professional focused on resident engagement, thoughtful presentation, clear communication, and dependable event-day execution.</p>
              <div className="cs-founder-tags">
                {['Apartment community events','Custom event planning','Local sponsor coordination'].map(t=><span className="cs-founder-tag" key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><AHead label="Experience that carries over" title="Broader event experience applied to resident life." /></div>
          <div className="cs-numbered" data-stagger>
            {EXPERIENCE.map(e=><div className="cs-numbered-item" key={e.n} data-reveal><span>{e.n}</span><h3>{e.t}</h3><p>{e.d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><AHead label="FAQ" title="Clear answers before you begin planning." body="How Community Spark handles pricing, customization, vendors, weather, sponsorship, and the booking process." /></div>
          <div className="cs-faq-grid" data-stagger>
            {FAQS.map(([q,a])=><div key={q} data-reveal><AFaq question={q}>{a}</AFaq></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section cs-soft">
        <div className="cs-wrap">
          <div data-reveal><AHead label="Planning policies" title="Simple expectations for a smoother event." body="This summary explains the general planning approach. The final proposal and signed agreement contain the specific terms for each event." /></div>
          <div className="cs-policy-grid" data-stagger>
            {POLICIES.map(([n,t,d])=><div className="cs-policy" key={n} data-reveal><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <ClosingPanel label="Still have a question?" title="Ask before you plan anything."
          body="Send the question directly — pricing, vendors, timing, or whether an idea is even possible. You'll get a straight answer, not a sales sequence."
          ctaLabel="Contact Community Spark" ctaHref="Contact.html" linkLabel="Or browse the event catalog" linkHref="Events.html" />
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AboutApp />);
