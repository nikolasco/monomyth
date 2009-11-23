MONOMYTH_FILES=\
	COPYING.js \
	src/namespace.js \
	src/class.js

all:
	cat $(MONOMYTH_FILES) > monomyth.js
