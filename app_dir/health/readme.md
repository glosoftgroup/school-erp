## Health Check Basics

This will try to explain a bit about the motivation for this generic way of declaring and using 
health checks on Hermes

## The Past

New Relic or any service trying to do availability monitoring would try to load the root API 
endpoint (`\tz\`), and if it got a response (usually a redirect since there's no auth), the 
assumption would be that the system is fine.  While this is OK for a smoke test, it doesn't cover
checking the services themselves, such as DB health.

## Proposal 

Create a way to have pluggable health-checks which adopt an all-or-nothing approach, ie each of the
checks need to return 0 errors else the assumed HTTP response is a 503.  The endpoint will be
accessible without auth, and should give a 200 for system OK or 503 for any error (with detailed 
errors for each failure that occurs per health check) 

## How to Add a New Health Check

- Create a new class that inherits from the `BaseHealthCheckBackend` class in `app_dir/health/backends.py`
- The new class just needs to extend the `check` function, which is where the logic for health check lies
- In this new function, perform the checks you need to do, raising an error for any check that can fail
- All the health checks will be registered in a plugin directory for them to be usable
- This will be done by adding your new health check to `app_dir/health/__init__.py`


## Example - Adding a new redis health check

The assumption here is that the necessary setup for redis has already been done.

Create a new python package folder in `app_dir/health` (this just makes it easier to track the plugins)
This will give you the structure:

```
app_dir/health
    - redis
        - __init__.py
```

Inside the redis folder, create a python file called `backends`

```
app_dir/health
    - redis
        - __init__.py
        - backends.py
```

The contents of this file will be (just a rough example):

```
import redis
rs = redis.Redis("localhost")

from ..backends import BaseHealthCheckBackend
from ..exceptions import ServiceUnavailable



class RedisHealthCheck(BaseHealthCheckBackend):
    def check(self):

        try:
            response = rs.client_list()
        except (redis.exceptions.ConnectionError, redis.exceptions.BusyLoadingError) as error:
            self.add_error(ServiceUnavailable(str(error)))
        except BaseException as error:
            self.add_error(ServiceUnavailable(str(error)))
```

Register this new health check in `app_dir/health/__init__.py`

```
from plugins import plugin_dir

from app_dir.health.redis.backends import RedisHealthCheck
plugin_dir.register(RedisHealthCheck)

```

Restart your server process, and pull up this endpoint `<root>/health`.  If everything is running OK,
you should see green tiles (browser version) or a JSON response if you provide the `application/json` 
content type header in the request.

## Example JSON responses

### All health checks fail

```
{
    "DatabaseHealthCheck": "unavailable: database error could not connect to server: Connection 
    refused\n\tIs the server running on host \"127.0.0.1\" and accepting\n\tTCP/IP connections on 
    port 5432?\n",
    "QueueHealthCheck": "unavailable: [Errno 111] Connection refused"
}
```

### DB healthy but rabbitmq is down

```
{
    "DatabaseHealthCheck": "working",
    "QueueHealthCheck": "unavailable: [Errno 111] Connection refused"
}
```

### All health checks pass

```
{
    "DatabaseHealthCheck": "working",
    "QueueHealthCheck": "working"
}
```

## Postman collections
Production: https://www.getpostman.com/collections/8260243ab2cfd25884cc