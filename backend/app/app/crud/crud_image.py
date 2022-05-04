from typing import List, Union, Any, Dict

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from pydantic import UUID4

from app.crud.base import CRUDBase
from app.models import Image, Tag
from app.schemas.image import ImageCreate, ImageUpdate
from app.utils.db import get_or_create


class CRUDImage(CRUDBase[Image, ImageCreate, ImageUpdate]):
    def create_with_user(
        self, db: Session, *, obj_in: ImageCreate, user_id: UUID4
    ) -> Image:
        obj_in_data = jsonable_encoder(obj_in)
        tags_data = obj_in_data.pop("tags", None)

        db_obj = self.model(**obj_in_data, user_id=user_id)
        if tags_data:
            for tag_data in tags_data:
                tag_obj, _ = get_or_create(db, Tag, **tag_data)
                db_obj.tags.append(tag_obj)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user(
        self, db: Session, *, user_id: UUID4, skip: int = 0, limit: int = 100
    ) -> List[Image]:
        return (
            db.query(self.model)
            .filter(Image.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def update(
        self,
        db: Session,
        *,
        db_obj: Image,
        obj_in: Union[ImageUpdate, Dict[str, Any]]
    ) -> Image:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        tags_data = update_data.pop("tags", None)
        if isinstance(tags_data, list):
            tags_objs = list(map(
                lambda tag_data: get_or_create(db, Tag, **tag_data)[0],
                tags_data,
            ))
            db_obj.tags = tags_objs
        return super().update(db=db, db_obj=db_obj, obj_in=update_data)


image = CRUDImage(Image)
