import os
from typing import Dict, Any, List, Optional
import requests
from dotenv import load_dotenv

from .admin_types import (
	UserType,
	SparePartType,
	MaintenanceServiceType,
	RepairOrderType,
	RepairOrderDetailType,
)

load_dotenv()
API_URL = os.getenv("NEST_API_URL")


def _build_headers(auth_header: Optional[str] = None, extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    headers: Dict[str, str] = {}

    # Siempre agregar "Bearer " si no está presente
    if auth_header:
        if not auth_header.startswith("Bearer "):
            auth_header = f"Bearer {auth_header}"
        headers["Authorization"] = auth_header

    if extra:
        headers.update(extra)

    return headers


def get_users(auth_header: Optional[str] = None) -> List[UserType]:
	res = requests.get(f"{API_URL}/users", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	users = res.json() or []
	out: List[UserType] = []
	for u in users:
		out.append(UserType(id=u.get("id"), name=u.get("name"), email=u.get("email"), role=u.get("role")))
	return out


def get_user(user_id: str, auth_header: Optional[str] = None) -> Optional[UserType]:
	res = requests.get(f"{API_URL}/users/{user_id}", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	u = res.json() or {}
	return UserType(id=u.get("id"), name=u.get("name"), email=u.get("email"), role=u.get("role"))


def create_user(payload: Dict[str, Any], auth_header: Optional[str] = None) -> UserType:
	res = requests.post(f"{API_URL}/users", json=payload, headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	u = res.json()
	return UserType(id=u.get("id"), name=u.get("name"), email=u.get("email"), role=u.get("role"))


def delete_user(user_id: str, auth_header: Optional[str] = None) -> bool:
	res = requests.delete(f"{API_URL}/users/{user_id}", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	return res.status_code == 200 or res.status_code == 204


# Spare parts
def get_spare_parts(auth_header: Optional[str] = None) -> List[SparePartType]:
	res = requests.get(f"{API_URL}/spare-parts", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	items = res.json() or []
	out: List[SparePartType] = []
	for p in items:
		out.append(SparePartType(id=p.get("id"), name=p.get("name"), price=float(p.get("price", 0) or 0), stock=p.get("stock")))
	return out


# Services (maintenance)
def get_services(auth_header: Optional[str] = None) -> List[MaintenanceServiceType]:
	res = requests.get(f"{API_URL}/services", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	items = res.json() or []
	out: List[MaintenanceServiceType] = []
	for s in items:
		out.append(MaintenanceServiceType(
			id=s.get("id"),
			service_name=s.get("serviceName"),
			description=s.get("description"),
			base_price=float(s.get("basePrice", 0) or 0),
			estimated_time_minutes=s.get("estimatedTimeMinutes"),
			requires_parts=s.get("requiresParts", False),
			type=s.get("type"),
			active=s.get("active", False),
		))
	return out


# Repair orders and stats
def get_repair_orders(auth_header: Optional[str] = None) -> List[RepairOrderType]:
	res = requests.get(f"{API_URL}/repair-orders", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	items = res.json() or []
	out: List[RepairOrderType] = []
	for r in items:
		details_json = r.get("details") or r.get("ticketServices") or r.get("repairOrderDetails") or []
		details: List[RepairOrderDetailType] = []
		for d in details_json:
			svc = d.get("service") or {}
			# Sólo construir el objeto service si viene información mínima
			if svc and (svc.get("id") or svc.get("serviceName")):
				service = MaintenanceServiceType(
					id=svc.get("id"),
					service_name=svc.get("serviceName"),
					description=svc.get("description"),
					base_price=float(svc.get("basePrice", 0) or 0),
					estimated_time_minutes=svc.get("estimatedTimeMinutes"),
					requires_parts=svc.get("requiresParts", False),
					type=svc.get("type"),
					active=svc.get("active", False),
				)
			else:
				service = None

			details.append(RepairOrderDetailType(
				id=d.get("id"),
				service=service,
				unit_price=float(d.get("unitPrice", 0) or 0),
				discount=float(d.get("discount", 0) or 0),
				sub_total=float(d.get("subTotal", 0) or 0),
				status=d.get("status"),
				created_at=d.get("createdAt"),
				updated_at=d.get("updatedAt"),
			))

		# Extraer client_id probando varias ubicaciones/estilos (camelCase/snake_case y relaciones anidadas)
		client_id = (
			r.get("clientId") or r.get("client_id") or r.get("clientid") or
			(r.get("equipment") or {}).get("user", {}).get("id") or
			(r.get("equipment") or {}).get("userId") or
			(r.get("evaluatedBy") or {}).get("id")
		)

		# Extraer technician_id: búsqueda en el objeto orden y en los detalles
		technician_id = (
			r.get("technicianId") or r.get("technician_id") or r.get("technicianid")
		)
		if not technician_id:
			# Buscar en los detalles (primer técnico disponible)
			for d in details_json:
				tech = (d.get("technician") or {})
				if tech.get("id"):
					technician_id = tech.get("id")
					break
				# también probar otras convenciones dentro del detalle
				if d.get("technicianId"):
					technician_id = d.get("technicianId")
					break

		out.append(RepairOrderType(
			id=r.get("id"),
			details=details,
			total=float(r.get("total", 0) or 0),
			status=r.get("status"),
		))
	return out


def get_orders_overview(auth_header: Optional[str] = None) -> Dict[str, Any]:
	res = requests.get(f"{API_URL}/repair-orders/stats/overview", headers=_build_headers(auth_header), timeout=10)
	res.raise_for_status()
	return res.json() or {}

