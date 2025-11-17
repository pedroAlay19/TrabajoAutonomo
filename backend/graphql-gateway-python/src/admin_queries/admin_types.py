import strawberry
from typing import Optional, List


@strawberry.type
class MaintenanceServiceType:
	id: Optional[str]
	service_name: Optional[str]
	description: Optional[str]
	base_price: Optional[float]
	estimated_time_minutes: Optional[int]
	requires_parts: Optional[bool]
	type: Optional[str]
	active: Optional[bool]


@strawberry.type
class RepairOrderDetailType:
	id: Optional[str]
	service: Optional[MaintenanceServiceType]
	unit_price: Optional[float]
	discount: Optional[float]
	sub_total: Optional[float]
	status: Optional[str]
	created_at: Optional[str]
	updated_at: Optional[str]


@strawberry.type
class UserType:
	id: Optional[str]
	name: Optional[str]
	email: Optional[str]
	role: Optional[str]


@strawberry.type
class SparePartType:
	id: Optional[str]
	name: Optional[str]
	price: Optional[float]
	stock: Optional[int]


@strawberry.type
class RepairOrderType:
	id: Optional[str]
	details: Optional[List[RepairOrderDetailType]]
	total: Optional[float]
	status: Optional[str]


@strawberry.type
class OrdersOverviewType:
	total: Optional[int]
	active: Optional[int]


@strawberry.type
class UsersOverviewType:
	total_clients: Optional[int]
	total_technicians: Optional[int]
