import netlifyIdentity from 'netlify-identity-widget';

const initIdentity = () => {
  if (window.netlifyIdentity) {
    netlifyIdentity.init({
      APIUrl: 'https://career-survey.netlify.app/.netlify/identity',
      logo: false
    });
  }
};

initIdentity();

export default netlifyIdentity; 