"use strict";
const express = require('express');
const router = express.Router();

router.get('/*', function(request, response) {
    response.sendfile('public/index.html');
});

module.exports = router;