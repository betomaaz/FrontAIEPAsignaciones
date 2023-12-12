
import 'classlist.js';
import 'web-animations-js'; 
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js'; 
import 'core-js/es7/array';
import 'core-js/es7/object';

if (typeof SVGElement.prototype.contains === 'undefined') {
  SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}
