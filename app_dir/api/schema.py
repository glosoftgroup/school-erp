import graphene

import app_dir.modules.finance.fee.schema


class Query(app_dir.modules.finance.fee.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


schema = graphene.Schema(query=Query)

