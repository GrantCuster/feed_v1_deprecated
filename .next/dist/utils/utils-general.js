'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var slugDate = exports.slugDate = function slugDate(date_string) {
	var date = new Date(date_string);
	var slug_date = date.toISOString().replace(/-/g, '').replace(/:/g, '').replace(/\./g, '');
	return slug_date;
};