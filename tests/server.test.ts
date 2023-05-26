import { expect } from 'chai';
import { describe, it } from 'mocha';
import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

describe('GET /', () => {
  it('responds with "Hello, World!"', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.equal('Hello, World!');
        done(err);
      });
  });
});
