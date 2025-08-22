#!/usr/bin/env python3
"""Fetch LinkedIn recommendations and update Jekyll data file.

The script calls the LinkedIn API to retrieve recommendations for the
configured profile and writes them to `_data/recommendations.yml` in the
format expected by the site. Set the following environment variables before
running:

- `LINKEDIN_ACCESS_TOKEN`: OAuth access token with permission to read
  recommendations.
- `LINKEDIN_PROFILE_ID`: The numeric ID of the LinkedIn profile.

Example usage:
    $ LINKEDIN_ACCESS_TOKEN=xxx LINKEDIN_PROFILE_ID=123 \
        python scripts/fetch_linkedin_recommendations.py
"""
from __future__ import annotations

import os
import sys
from typing import List, Dict

import requests
import yaml

API_URL = "https://api.linkedin.com/v2/recommendations"


def fetch_recommendations(token: str, profile_id: str) -> List[Dict[str, str]]:
    """Return recommendations for the given profile from LinkedIn."""
    headers = {"Authorization": f"Bearer {token}"}
    params = {"q": "recipient", "profileId": profile_id}
    response = requests.get(API_URL, headers=headers, params=params, timeout=10)
    response.raise_for_status()
    elements = response.json().get("elements", [])
    recs: List[Dict[str, str]] = []
    for item in elements:
        recommender = item.get("recommender", {})
        recs.append(
            {
                "author": recommender.get("name", ""),
                "role": recommender.get("headline", ""),
                "date": item.get("createdAt", ""),
                "text": item.get("recommendationText", ""),
            }
        )
    return recs


def save_recommendations(recommendations: List[Dict[str, str]]) -> None:
    """Write recommendations to `_data/recommendations.yml`."""
    data_path = os.path.join(os.path.dirname(__file__), "..", "_data", "recommendations.yml")
    with open(data_path, "w", encoding="utf-8") as fh:
        yaml.dump(recommendations, fh, allow_unicode=True, sort_keys=False)


if __name__ == "__main__":
    token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    profile_id = os.getenv("LINKEDIN_PROFILE_ID")
    if not token or not profile_id:
        sys.exit("Set LINKEDIN_ACCESS_TOKEN and LINKEDIN_PROFILE_ID environment variables.")
    recs = fetch_recommendations(token, profile_id)
    save_recommendations(recs)
    print(f"Saved {len(recs)} recommendations.")
