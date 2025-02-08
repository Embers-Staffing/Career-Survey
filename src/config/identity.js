import netlifyIdentity from 'netlify-identity-widget';

// Configure the widget
netlifyIdentity.init({
  APIUrl: 'https://your-site-name.netlify.app/.netlify/identity',
  logo: false // Optional - disable the Netlify logo
});

export default netlifyIdentity; 