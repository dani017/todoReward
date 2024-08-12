import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { listDecks, addDeck, getScores, postScore, resetForTesting } from './routes';


describe('routes', function() {

  //Test list route
  it('list', function() {

    //No existing decks case
    const req1 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {}});
    const res1 = httpMocks.createResponse();
    listDecks(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {decks: []});

    //Decks exist
    const addReq1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "new", cards: ["front | back"]}});
    const addRes1 = httpMocks.createResponse();
    addDeck(addReq1, addRes1);
    const req2 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {}});
    const res2 = httpMocks.createResponse();
    listDecks(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {decks: [{name: "new", cards: ["front | back"]}]});
    
    const addReq2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "numbers", cards: ["1 | two", "2 | two", "3 | three"]}});
    const addRes2 = httpMocks.createResponse();
    addDeck(addReq2, addRes2);
    const req3 = httpMocks.createRequest(
      {method: 'GET', url: '/api/list', query: {}});
    const res3 = httpMocks.createResponse();
    listDecks(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(), {decks: [{name: "new", 
      cards: ["front | back"]}, {name: "numbers", cards: ["1 | two", "2 | two", "3 | three"]}]});


    resetForTesting(); 
    
   
  });

  //Test add route
  it('add', function() {

    //Error case: missing name
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {}});
    const res1 = httpMocks.createResponse();
    addDeck(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        "missing 'name' parameter");
  
    //Error case: missing card
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "couch"}});
    const res2 = httpMocks.createResponse();
    addDeck(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
        "missing 'card' paramater"); 


    //Straight line: successful add 
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "first", cards: ["front | back"]}});
    const res3 = httpMocks.createResponse();
    addDeck(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(),
        {added: true});

    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "second", cards: ["front | back", "green | blue"]}});
    const res4 = httpMocks.createResponse();
    addDeck(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData(),
        {added: true});

    //Error case: deck already exists
    const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "first", cards:["silly | goose"]}});
    const res5 = httpMocks.createResponse();
    addDeck(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(),
      "Deck 'first' already exists"); 

    resetForTesting();


  });

  //Test getScores route
  it('getScores', function() {

    //No scores: 
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/getScores', query: {}});
    const res1 = httpMocks.createResponse();
    getScores(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {scores: []});

    //Existing Scores:
     const postReq1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/postScore', body: {score:"name, deck, 0-100"}});
    const postRes1 = httpMocks.createResponse();
    postScore(postReq1, postRes1);
    const req2 = httpMocks.createRequest(
        {method: 'GET', url: '/api/getScores', query: {}});
    const res2 = httpMocks.createResponse();
    getScores(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {scores: ["name, deck, 0-100"]});

    const postReq2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/postScore', body: {score:"Danielle, Days of the Week (Korean), 100"}});
    const postRes2 = httpMocks.createResponse();
    postScore(postReq2, postRes2);
    getScores(req2, res2); //reuse same request
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {scores: ["name, deck, 0-100", "Danielle, Days of the Week (Korean), 100"]});

    resetForTesting();

  });

  //Test postScore
  it('postScore', function() {

    //Error case: missing score
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/postScore', body: {}});
    const res1 = httpMocks.createResponse();
    postScore(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        "missing 'score' parameter");

    //Straightline: successful post
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/postScore', body: {score:"name, deck, 0-100"}});
    const res2 = httpMocks.createResponse();
    postScore(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(),
        {updated: true});

    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/postScore', body: {score:"Danielle, Days of the Week (Korean), 100"}});
    const res3 = httpMocks.createResponse();
    postScore(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(),
        {updated: true});
    
    resetForTesting();
  });

});
