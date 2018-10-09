'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _dappeteer = require('dappeteer');

var _dappeteer2 = _interopRequireDefault(_dappeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    // Multiple browsers support
    isMultiBrowser: true,

    browser: null,

    metamask: null,

    openedPages: {},

    // Required - must be implemented
    // Browser control
    openBrowser: function openBrowser(id, pageUrl, browserName) {
        var _this = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var puppeteerArgs, page;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (_this.browser) {
                                _context.next = 9;
                                break;
                            }

                            puppeteerArgs = [];


                            if (browserName === 'no_sandbox') {
                                puppeteerArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
                            }
                            _context.next = 5;
                            return _dappeteer2.default.launch(_puppeteer2.default, {
                                timeout: 10000,
                                headless: false,
                                args: puppeteerArgs
                            });

                        case 5:
                            _this.browser = _context.sent;
                            _context.next = 8;
                            return _dappeteer2.default.getMetamask(_this.browser);

                        case 8:
                            _this.metamask = _context.sent;

                        case 9:
                            _context.next = 11;
                            return _this.browser.newPage();

                        case 11:
                            page = _context.sent;
                            _context.next = 14;
                            return page.goto(pageUrl);

                        case 14:
                            _this.openedPages[id] = page;

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    closeBrowser: function closeBrowser(id) {
        var _this2 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            delete _this2.openedPages[id];
                            _context2.next = 3;
                            return _this2.browser.close();

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    isValidBrowserName: function isValidBrowserName() {
        var _this3 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            return _context3.abrupt('return', true);

                        case 1:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },


    // Extra methods
    resizeWindow: function resizeWindow(id, width, height) {
        var _this4 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _this4.openedPages[id].setViewport({ width: width, height: height });

                        case 2:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },
    takeScreenshot: function takeScreenshot(id, screenshotPath) {
        var _this5 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _this5.openedPages[id].screenshot({ path: screenshotPath });

                        case 2:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },


    // Testcafe method to get Dappeter Metamask instance
    getMetamask: function getMetamask(t /* testcafe instance */) {
        var _this6 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            return _context6.abrupt('return', t.testRun.browserManipulationQueue.browserProvider.plugin.metamask);

                        case 1:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },


    // Testcafe method to get Dappeter Metamask instance
    getMetamaskRaw: function getMetamaskRaw() {
        var _this7 = this;

        return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            return _context7.abrupt('return', _this7.metamask);

                        case 1:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }))();
    }
};
module.exports = exports['default'];