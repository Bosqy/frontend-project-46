install:
	npm ci
lint:
	npx eslint --no-eslintrc --config .eslintrc.yml .
publish:
	npm publish --dry-run
test:
	npm test
