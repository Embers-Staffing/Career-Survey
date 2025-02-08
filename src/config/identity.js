import netlifyIdentity from 'netlify-identity-widget';

// Configure the widget
netlifyIdentity.init({
  logo: false,
  cookieSecure: true,
  secureCookie: true,
  sameSiteCookie: 'Strict'
});

export default netlifyIdentity; 