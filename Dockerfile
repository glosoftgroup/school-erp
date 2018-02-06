FROM python:3.6

MAINTAINER kent Marete <maretekent@gmail.com>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN pip install --no-cache-dir -r requirements.txt


EXPOSE 80
EXPOSE 8000
EXPOSE 3000

CMD ./devops/scripts/wait-for-it.sh -t 300 db:5432 && ./devops/scripts/run.sh True