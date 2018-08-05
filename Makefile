D=docker
IMAGE=reactjs_contacts
DIR=$(CURDIR)
Y=yarn


all:
	$(Y)
	$(Y) start

prod:
	rm -f build
	$(MAKE) build
	$(MAKE) run

build:
	$(D) build -t $(IMAGE) $(DIR)

run:
	$(D) run -d --rm --name=${IMAGE} -p 5000:3001 $(IMAGE)
