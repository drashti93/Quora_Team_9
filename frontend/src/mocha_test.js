it("should be able give all the corresponding answers for a particular question", function(done) {
    authenticated.post('/questions/:questionId/details')
        .send({ "id": 1, "dir" : "/"})
        .expect("Content-type", /json/)
        .expect(200)
        .end(function(err, res) {
            res.status.should.equal(200);
            res.body.code.should.equal(200);
            let files = res.body.files;
            let size = files.size();
            size.should.equals(3);
            done();
        });
});


