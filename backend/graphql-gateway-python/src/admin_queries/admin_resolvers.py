import strawberry
from typing import List, Optional
from strawberry.types import Info

from .admin_types import (
    UserType,
    SparePartType,
    MaintenanceServiceType,
    RepairOrderType,
    OrdersOverviewType
)
from . import admin_service


def _extract_auth(info: Info) -> Optional[str]:
    """
    Extrae el token JWT desde los headers globales de GraphiQL.
    Ya no depende de argumentos en el schema.
    """

    try:
        request = info.context.get("request")
        if not request:
            return None

        token = request.headers.get("authorization")
        if not token:
            return None

        # Asegurar "Bearer "
        if not token.startswith("Bearer "):
            token = f"Bearer {token}"

        return token

    except Exception:
        return None


@strawberry.type
class AdminQueries:

    @strawberry.field
    def users(self, info: Info) -> List[UserType]:
        token = _extract_auth(info)
        return admin_service.get_users(auth_header=token)

    @strawberry.field
    def user(self, info: Info, id: str) -> Optional[UserType]:
        token = _extract_auth(info)
        return admin_service.get_user(id, auth_header=token)

    @strawberry.field
    def spare_parts(self, info: Info) -> List[SparePartType]:
        token = _extract_auth(info)
        return admin_service.get_spare_parts(auth_header=token)

    @strawberry.field
    def services(self, info: Info) -> List[MaintenanceServiceType]:
        token = _extract_auth(info)
        return admin_service.get_services(auth_header=token)

    @strawberry.field
    def repair_orders(self, info: Info) -> List[RepairOrderType]:
        token = _extract_auth(info)
        return admin_service.get_repair_orders(auth_header=token)

    @strawberry.field
    def orders_overview(self, info: Info) -> OrdersOverviewType:
        token = _extract_auth(info)
        return admin_service.get_orders_overview(auth_header=token)


@strawberry.type
class AdminMutations:

    @strawberry.mutation
    def create_user(
        self,
        info: Info,
        name: str,
        email: str,
        password: str,
        role: Optional[str] = "USER"
    ) -> UserType:
        token = _extract_auth(info)
        payload = {"name": name, "email": email, "password": password, "role": role}
        return admin_service.create_user(payload, auth_header=token)

    @strawberry.mutation
    def delete_user(self, info: Info, id: str) -> bool:
        token = _extract_auth(info)
        return admin_service.delete_user(id, auth_header=token)
