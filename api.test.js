const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app.js'); // Replace with the path to your Express app file
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
  describe('/api/blog-stats', () => {
    it('should return blog statistics', (done) => {
      chai.request(app)
        .get('/api/blog-stats')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('totalBlogs');
          expect(res.body).to.have.property('longestTitle');
          expect(res.body).to.have.property('blogsWithPrivacy');
          expect(res.body).to.have.property('uniqueTitles');
          done();
        });
    });
  });

  describe('/api/blog-search', () => {
    it('should return filtered blogs', (done) => {
      chai.request(app)
        .get('/api/blog-search?query=privacy')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          // You can add more specific assertions based on your expected response
          done();
        });
    });
  });
});
