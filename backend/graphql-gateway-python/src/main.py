import uvicorn
from strawberry.asgi import GraphQL
from schema import schema

class CustomGraphQL(GraphQL):
    async def get_context(self, request, response):
        return {"request": request}

app = CustomGraphQL(
    schema, 
    graphiql=True,
    )

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
