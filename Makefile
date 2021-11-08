install:
	npm ci
publish:
	npm publish --dry-run
	npm link
lint:
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest