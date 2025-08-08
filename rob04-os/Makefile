.PHONY: test run help

help:
	@echo "Targets:"
	@echo "  test  - run unit tests"
	@echo "  run   - run CLI help"

test:
	python3 -m unittest discover -s tests -p 'test_*.py' -v

run:
	python3 -m rob04 --help