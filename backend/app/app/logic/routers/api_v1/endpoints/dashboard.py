from typing import Any
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.logic import deps
from app import schemas
from app.models import Match, Image, Violator, Event
from app.models.enums import EventTypes


router = APIRouter()


@router.get("/dashboard-data")
async def get_dashboard_data(
    start_date: datetime,
    end_date: datetime,
    db: Session = Depends(deps.get_db),
    current_user: schemas.UserInDB = Depends(deps.get_current_active_user),
) -> Any:
    """
    Rewrite to SQL COUNT() aggregate func.
    """
    # Collect data for MATCHES PieChart
    matches = (
        db.query(Match).
        join(Image, Match.original_image).
        filter_by(user_id=current_user.id).
        filter(Match.found_date >= start_date).
        filter(Match.found_date <= end_date)
    )

    online_matches_number = matches.filter(Match.online == True).count()
    removed_matches_number = matches.filter(Match.online == False).count()
    reported_matches_number = matches.filter(Match.reported == True).count()

    # Collect data for DOMAINS PieChart
    violators = (
        db.query(Violator).
        join(Match).
        join(Image).
        filter_by(user_id=current_user.id)
    ).all()

    small_violators_number = len([v for v in violators if len(v.matches) <= 5])
    middle_violators_number = len([v for v in violators if 5 < len(v.matches) <= 10])
    big_violators_number = len([v for v in violators if 10 < len(v.matches)])

    # Collect data for IMAGES PieChart
    images = (
        db.query(Image).
        filter_by(user_id=current_user.id)
    ).all()

    little_plagiated_images_number = len([i for i in images if 1 <= len(i.matches) <= 10])
    medium_plagiated_images_number = len([i for i in images if 11 <= len(i.matches) <= 30])
    very_plagiated_images_number = len([i for i in images if 30 < len(i.matches)])

    # Collect data for general BarChart
    events = (
        db.query(Event).
        join(Match).
        join(Image).
        filter_by(user_id=current_user.id).
        filter(Event.created_at >= start_date).
        filter(Event.created_at <= end_date)
    )

    detected_events = events.filter(Event.type == EventTypes.DETECTED).all()
    reported_events = events.filter(Event.type == EventTypes.REPORTED).all()
    removed_events = events.filter(Event.type == EventTypes.REMOVED).all()

    # How many days end_date is ahead of start_date.
    # Beware, that we don't care about the time, only about the date
    days_difference = (end_date.date() - start_date.date()).days

    # Labels
    label_names = ["Detected", "Reported", "Removed"]

    # Generate all dates between start_date and end_date
    dates = [
        start_date.date() + timedelta(days=day_shift)
        for day_shift in range(days_difference+1)
    ]

    # Generate GroupItemValues
    group_item_values = []
    for date in dates:
        group_item_values.append(len([e for e in detected_events if e.created_at.date() == date]))
        group_item_values.append(len([e for e in reported_events if e.created_at.date() == date]))
        group_item_values.append(len([e for e in removed_events if e.created_at.date() == date]))

    return {
        "online_matches_number": online_matches_number,
        "removed_matches_number": removed_matches_number,
        "reported_matches_number": reported_matches_number,
        "small_violators_number": small_violators_number,
        "middle_violators_number": middle_violators_number,
        "big_violators_number": big_violators_number,
        "little_plagiated_images_number": little_plagiated_images_number,
        "medium_plagiated_images_number": medium_plagiated_images_number,
        "very_plagiated_images_number": very_plagiated_images_number,
        "bar_chart_data": {
            "label_names": label_names,
            "dates": dates,
            "group_item_values": group_item_values,
        }
    }
