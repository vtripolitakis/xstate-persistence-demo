.PHONY: setupdb install_node_modules install start stop

install_node_modules:
		npm install

setupdb:
		npm run initdb

install: install_node_modules setupdb

start:
		npm run start

stop:
		npm run stop