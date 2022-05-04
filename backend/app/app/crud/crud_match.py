from app.crud.base import CRUDBase
from app.models import Match
from app.schemas.match import MatchCreate, MatchUpdate


class CRUDMatch(CRUDBase[Match, MatchCreate, MatchUpdate]):
    pass


match = CRUDMatch(Match)
