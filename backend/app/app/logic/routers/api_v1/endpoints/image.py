from typing import Any, List
from urllib.parse import urljoin
import os

from fastapi import (
    APIRouter, Depends, HTTPException, UploadFile, File,
)
from sqlalchemy.orm import Session
import boto3
from uuid import uuid4

from app.core import config
from app.logic import deps
from app import crud, schemas


router = APIRouter()


@router.post("/upload-image/", dependencies=[Depends(deps.get_current_active_user)])
async def upload_image(file: UploadFile = File(...)):
    _, ext = os.path.splitext(file.filename)

    s3_client = boto3.client('s3', **config.AWS_CREDS)
    object_name = f"{uuid4()}{ext}"
    s3_client.upload_fileobj(
        file.file,
        config.AWS_BUCKET_NAME,
        object_name,
        ExtraArgs={'ACL': 'public-read'},
    )
    file_url = urljoin(config.AWS_CLOUDFRONT_URL, object_name)

    return {"file_url": file_url}


@router.get("/", response_model=List[schemas.Image])
async def read_images(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve images.
    """
    if current_user.is_superuser:
        images = crud.image.get_multi(db, skip=skip, limit=limit)
    else:
        images = crud.image.get_multi_by_user(
            db=db, user_id=current_user.id, skip=skip, limit=limit
        )
    return images


@router.post("/", response_model=schemas.Image)
async def create_image(
    *,
    db: Session = Depends(deps.get_db),
    image_in: schemas.ImageCreate,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new image.
    """
    image = crud.image.create_with_user(db=db, obj_in=image_in, user_id=current_user.id)
    print(image)
    return image


@router.put("/{id}", response_model=schemas.Image)
async def update_image(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    image_in: schemas.ImageUpdate,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an image.
    """
    image = crud.image.get(db=db, id=id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if not current_user.is_superuser and (image.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    image = crud.image.update(db=db, db_obj=image, obj_in=image_in)
    return image


@router.get("/{id}", response_model=schemas.Image)
async def read_image(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get image by ID.
    """
    image = crud.image.get(db=db, id=id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if not current_user.is_superuser and (image.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return image


@router.delete("/{id}", response_model=schemas.Image)
async def delete_image(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an image.
    """
    image = crud.image.get(db=db, id=id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    if not current_user.is_superuser and (image.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    image = crud.image.remove(db=db, id=id)
    return image
