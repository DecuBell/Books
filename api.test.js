const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;
chai.use(chaiHttp);

describe('Books API', () => {
    it('Should POST a book', (done) => {
        let body = { id: "1", title: "DevOps Magic", author: "Pesho" };
        chai.request(server)
            .post('/books')
            .send(body)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(201);
                done();
            })
    })

    it('Should GET a single book', (done) => {
        chai.request(server)
            .get('/books/1')
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(200);
                done();
            })
    })

    it('Should GET all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(200);
                expect(resp.body).to.be.a('array');
                done();
            })
    })

    it('Should Update a book', (done) => {
        const bookId = "1";
        const updatedBook = { id: bookId, title: "Updated Test Book", author: "Updated Author" }
        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(200);
                expect(resp.body).to.be.a('object');
                expect(resp.body.title).to.equal('Updated Test Book');
                expect(resp.body.author).to.equal('Updated Author');
                done();
            })
    })

    it('Should Delete a book', (done) => {
        const bookId = "1";
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(204);
                done();
            })
    })

    it('Verify a non-existing book', (done) => {
        const bookId = "9999";
        const updatedBook = { id: bookId, title: "Updated Test Book", author: "Updated Author" }
        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, resp) => {
                if (err) {
                    return done(err);
                }
                expect(resp.statusCode).to.equal(404);
            })
        
        chai.request(server)
        .put(`/books/${bookId}`)
        .send(updatedBook)
        .end((err, resp) => {
            if (err) {
                return done(err);
            }
            expect(resp.statusCode).to.equal(404);
        })

        chai.request(server)
        .delete(`/books/${bookId}`)
        .end((err, resp) => {
            if (err) {
                return done(err);
            }
            expect(resp.statusCode).to.equal(404);
            done();
        })
    })

})