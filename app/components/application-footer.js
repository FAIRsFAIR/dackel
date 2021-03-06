import Ember from 'ember';
import ENV from 'dackel/config/environment';
import fetch from 'fetch';

export default Ember.Component.extend({
  didInsertElement() {
    if (this.get('default')) {
      this.set('type', null);
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      self.set('data', data);
    });
  }
});
