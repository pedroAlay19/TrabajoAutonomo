import uvicorn
from strawberry.asgi import GraphQL
from starlette.middleware.cors import CORSMiddleware
from starlette.applications import Starlette
from schema import schema

class CustomGraphQL(GraphQL):
    async def get_context(self, request, response):
        return {"request": request}

graphql_app = CustomGraphQL(
    schema, 
    graphiql=True,
)

app = Starlette()
app.mount("/", graphql_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
