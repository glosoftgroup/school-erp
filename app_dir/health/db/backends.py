from __future__ import absolute_import

from django.db import connections, DatabaseError, IntegrityError, OperationalError

from ..backends import BaseHealthCheckBackend
from ..exceptions import ServiceUnavailable, UnexpectedResult


class DatabaseHealthCheck(BaseHealthCheckBackend):
    def check(self):
        # Connect to each configured database and do a generic SQL query
        # that doesn't write any data and doesn't depend on any tables
        try:
            for name in connections:
                cursor = connections[name].cursor()
                cursor.execute("SELECT 1;")
                row = cursor.fetchone()

                if row is None:
                    raise ServiceUnavailable("database error")

        except IntegrityError as e:
            # usually indicates one of the specified constraints in the DB schema has been
            # violated eg not-null, unique etc
            raise UnexpectedResult("database integrity error: {error}".format(error=str(e)))
        except (DatabaseError, OperationalError) as e:
            # usually indicates there isn't a connection to the DB
            # probably due to invalid auth or just simply that the DB service isn't running
            raise ServiceUnavailable("database error {error}".format(error=str(e)))
        except Exception as e:
            raise ServiceUnavailable(str(e))
