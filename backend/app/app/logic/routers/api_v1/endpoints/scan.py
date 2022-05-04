from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.logic import deps
from app import schemas, crud
from app.utils.google import find_copyright_violations_on_image


router = APIRouter()


@router.post("/{image_id}")
async def scan_image(
    image_id: int,
    db: Session = Depends(deps.get_db),
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user)
) -> Any:
    image = crud.image.get(db=db, id=image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if image.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    find_copyright_violations_on_image.send(image_id)

    return {"detail": f"Scan on image #{image_id} started."}

