# Niobium - a naive web browser in nodejs

This is an experimental project aiming at a naive but working implementation of a web browser.

The development process is progressive, which means present good library such as html/css parsers are directly borrowed as a module. I should gradually replace those modules with my own from scratch.

Another issue is compatibility with the W3C/WHATWG specs of HTML/CSS. Because of the intrinsic characteristics of the niobium project, best effort should be delivered to ensure that most important specs, such as the basic DOM structure and box layout model, are implemented.
