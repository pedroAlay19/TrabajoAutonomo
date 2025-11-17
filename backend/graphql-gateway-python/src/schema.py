import strawberry
from admin_queries.admin_resolvers import AdminQueries, AdminMutations
class Query(AdminQueries):
    pass

class Mutation(AdminMutations):
    pass


schema = strawberry.Schema(query=Query, mutation=Mutation)