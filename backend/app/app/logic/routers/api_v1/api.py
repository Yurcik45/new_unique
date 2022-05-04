from fastapi import APIRouter


from .endpoints import image, match, scan, dashboard, shopify



router = APIRouter()
router.include_router(image.router, prefix="/image", tags=["images"])
router.include_router(match.router, prefix="/match", tags=["matches"])
router.include_router(scan.router, prefix="/scan", tags=["scanning"])
router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
router.include_router(shopify.router, prefix="/shopify", tags=["shopify"])

