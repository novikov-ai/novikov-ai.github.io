SLUG ?= "default-slug"
YEAR ?= $(shell date +"%Y")
MONTH ?= $(shell date +"%B" | tr '[:upper:]' '[:lower:]')

post:
	hugo new posts/$(YEAR)/$(MONTH)/$(SLUG).md --kind post_en && \
	hugo new ../ru/posts/$(YEAR)/$(MONTH)/$(SLUG).md --kind post_ru