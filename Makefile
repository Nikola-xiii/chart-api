SHELL=/bin/bash
ifndef BUILD_NUMBER
BUILD_NUMBER=0
endif

ifndef tag-name
tag-name=latest
endif

APP_NAME=$(app-name)
PATH_BUILD=$(path-build)

export BUILD_NUMBER

APP_VERSION=1.0.$(BUILD_NUMBER)

REMOTE_IMAGE=loopme/$(APP_NAME)
VERSION_TAG=$(REMOTE_IMAGE):$(APP_VERSION)
LATEST_TAG=$(REMOTE_IMAGE):$(tag-name)

build: FORCE
	docker build -t $(APP_NAME) .

	docker tag $(APP_NAME) $(APP_NAME):$(APP_VERSION)

push: build
	docker tag $(APP_NAME):$(APP_VERSION) $(VERSION_TAG)
	docker tag $(VERSION_TAG) $(LATEST_TAG)

	docker push $(VERSION_TAG)
	docker push $(LATEST_TAG)

FORCE:
