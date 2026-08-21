/* Local stand-in for the Community Spark component bundle, sized to just the
   three components this prototype uses (Button, SectionLabel, BrandMark).
   Not for shipping — recreate against the target codebase per the handoff README. */
(function(){
  var h = React.createElement;

  function Button(props){
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var disabled = !!props.disabled;
    var React_ = React;
    var _React$useState = React_.useState(false), hover = _React$useState[0], setHover = _React$useState[1];

    var base = {
      display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'8px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily:'var(--font-ui)',fontWeight:'var(--fw-bold)',
      borderRadius:'var(--r-pill)',
      transition:'background var(--dur-base),border-color var(--dur-base),color var(--dur-base),transform var(--dur-base),box-shadow var(--dur-base)',
      width: props.fullWidth ? '100%' : 'auto',
      minHeight: size === 'sm' ? '40px' : '50px',
      padding: size === 'sm' ? '0 20px' : '0 26px',
      fontSize: size === 'sm' ? 'var(--text-meta)' : 'var(--text-body-sm)',
      opacity: disabled ? .5 : 1,
      transform: hover && !disabled ? 'var(--lift-btn)' : 'none'
    };

    var variantStyle = variant === 'inkGhost'
      ? {
          background: hover && !disabled ? 'var(--cream)' : 'transparent',
          color:'var(--ink)',
          border: '2px solid ' + (hover && !disabled ? 'var(--ink)' : 'var(--line)'),
          boxShadow:'none'
        }
      : {
          background: hover && !disabled ? 'var(--gold-dark)' : 'var(--gold)',
          color:'#fff',
          border:'2px solid ' + (hover && !disabled ? 'var(--gold-dark)' : 'var(--gold)'),
          boxShadow: hover && !disabled ? 'var(--shadow-gold)' : 'none'
        };

    return h('button', {
      onClick: disabled ? undefined : props.onClick,
      disabled: disabled,
      onMouseEnter: function(){ setHover(true); },
      onMouseLeave: function(){ setHover(false); },
      style: Object.assign({}, base, variantStyle)
    }, props.children);
  }

  function SectionLabel(props){
    return h('p', {
      style:{
        display:'flex',alignItems:'center',gap:'10px',margin:'0 0 12px',
        fontFamily:'var(--font-ui)',fontSize:'var(--text-eyebrow)',fontWeight:'var(--fw-bold)',
        textTransform:'uppercase',letterSpacing:'var(--track-section-label)',color:'var(--gold)'
      }
    },
      h('span', {style:{display:'inline-block',width:'20px',height:'1px',background:'var(--gold)'}}),
      props.children
    );
  }

  function BrandMark(props){
    var titleSize = props.titleSize || 19;
    return h('div', {style:{display:'flex',alignItems:'center',gap:'12px'}},
      h('span', {
        style:{
          display:'inline-flex',alignItems:'center',justifyContent:'center',
          width:'40px',height:'40px',borderRadius:'var(--r-circle)',background:'var(--ink)',
          color:'var(--gold-light)',fontFamily:'var(--font-display)',fontSize:'20px',flexShrink:0
        }
      }, '✦'),
      h('span', {style:{display:'flex',flexDirection:'column',gap:'2px'}},
        h('strong', {
          style:{
            fontFamily:'var(--font-display)',fontWeight:'var(--fw-bold)',
            fontSize: titleSize + 'px',color:'var(--ink)',lineHeight:1
          }
        }, 'Community Spark'),
        props.tagline && h('span', {
          style:{
            fontFamily:'var(--font-ui)',fontSize:'9px',fontWeight:'var(--fw-bold)',
            textTransform:'uppercase',letterSpacing:'var(--track-nav-small)',color:'var(--muted)'
          }
        }, props.tagline)
      )
    );
  }

  window.CommunitySparkDesignSystem_6bcc19 = { Button: Button, SectionLabel: SectionLabel, BrandMark: BrandMark };
})();
