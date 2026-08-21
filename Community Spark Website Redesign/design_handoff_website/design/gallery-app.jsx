const {Button:GBtn,SectionHead:GHead} = window.CommunitySparkDesignSystem_6bcc19;

const SHOTS=[
  ['images/photo-1.jpg','Signature community event'],
  ['images/photo-2.jpg','Resident social'],
  ['images/photo-4.jpg','Elevated presentation'],
  ['images/photo-3.jpg','Poolside experience'],
  ['images/photo-5.jpg','Family event'],
  ['images/photo-6.jpg','Community connection']
];

function GalleryApp(){
  useReveal();
  return (
    <SiteShell active="Gallery">
      <PageHero image="images/photo-4.jpg" eyebrow="Gallery"
        title="Events should feel memorable."
        lead="A look at the style and standard of presentation Community Spark works toward — and an honest note about what these images are."
        actions={<React.Fragment><GBtn variant="primary" href="Events.html">Browse the Catalog</GBtn><GBtn variant="outline" href="Contact.html">Plan an Event</GBtn></React.Fragment>} />

      <section className="cs-section">
        <div className="cs-wrap">
          <div data-reveal><GHead label="A note on these photos" title="No client gallery yet — and we'd rather say so." body="Community Spark is newly launched and hasn't yet delivered events for client communities. The images below are licensed stock photography, included to show the style and standard of presentation we work toward. They are not photos of events this business has produced. As client events are completed, original photography will replace them here." /></div>
          <div className="cs-gallery" data-stagger>
            {SHOTS.map(([src,label])=>(
              <figure key={src} data-reveal>
                <img src={src} alt={'Style reference — '+label.toLowerCase()} loading="lazy" />
                <figcaption><span>Style reference — {label.toLowerCase()}</span><span className="cs-gallery-tag">Stock image</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section" style={{paddingTop:0}}>
        <ClosingPanel label="Booking 2026 now" title="Be one of the first events in this gallery."
          body="Communities booking this year help set the standard for everything shown here. Tell us the date and the kind of event your residents would turn out for."
          ctaLabel="Plan an Event" ctaHref="Contact.html" linkLabel="Or see what events cost" linkHref="Pricing.html" />
      </section>
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<GalleryApp />);
