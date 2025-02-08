import netlifyIdentity from 'netlify-identity-widget';

// Wait for the script to be ready
const initIdentity = () => {
  return new Promise((resolve) => {
    if (window.netlifyIdentity) {
      netlifyIdentity.init({
        logo: false,
        cookieSecure: true,
        secureCookie: true,
        sameSite: 'Lax'
      });
      resolve();
    } else {
      document.addEventListener('netlifyIdentityReady', () => {
        netlifyIdentity.init({
          logo: false,
          cookieSecure: true,
          secureCookie: true,
          sameSite: 'Lax'
        });
        resolve();
      });
    }
  });
};

// Initialize immediately
initIdentity().catch(console.error);

export default netlifyIdentity; 