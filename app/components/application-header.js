import Ember from 'ember';
import ENV from 'dackel/config/environment';
import fetch from 'fetch';
const { service } = Ember.inject;

export default Ember.Component.extend({
  default: false,
  type: 'transparent',
  title: null,
  home: '/',
  user: true,
  data: {},

  actions: {
    transitionNoAccess() {
      this.get('router').transitionTo(this.get('home'));
    }
  },

  didInsertElement() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    } else if (this.get('sign-in')) {
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
      this.set('user', false);
    }

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (ENV.APP_URL === "https://app.datacite.org") {
        data.header_links = data.production_links;
      } else {
        data.header_links = data.stage_links;
      }
      self.set('data', data);
    });
  }
});