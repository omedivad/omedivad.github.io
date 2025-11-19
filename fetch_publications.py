#!/usr/bin/env python3
"""
Script to fetch publications from Google Scholar profile and generate publications.json
"""

import json
import re
import sys
from urllib.parse import urlparse, parse_qs
import requests
from bs4 import BeautifulSoup

SCHOLAR_USER_ID = 'UJ4D3rYAAAAJ'
SCHOLAR_URL = f'https://scholar.google.com/citations?user={SCHOLAR_USER_ID}&hl=en&cstart=0&pagesize=100'

def fetch_scholar_publications():
    """
    Fetch publications from Google Scholar profile
    Note: This is a basic scraper. Google Scholar may block requests.
    For production, consider using scholar.py library or a proxy service.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(SCHOLAR_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        publications = []
        
        # Find all publication entries
        pub_entries = soup.find_all('tr', class_='gsc_a_tr')
        
        for entry in pub_entries:
            try:
                # Extract title and URL
                title_elem = entry.find('a', class_='gsc_a_at')
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                pub_url = 'https://scholar.google.com' + title_elem.get('href', '')
                
                # Extract authors
                authors_elem = entry.find('div', class_='gs_gray')
                authors = authors_elem.get_text(strip=True) if authors_elem else ''
                
                # Extract journal/venue
                journal_elem = entry.find('div', class_='gs_gray')
                journal = ''
                if journal_elem and journal_elem.find_next_sibling('div', class_='gs_gray'):
                    journal = journal_elem.find_next_sibling('div', class_='gs_gray').get_text(strip=True)
                
                # Extract year
                year_elem = entry.find('span', class_='gsc_a_y')
                year = year_elem.get_text(strip=True) if year_elem else ''
                
                # Extract citation count (optional)
                cite_elem = entry.find('a', class_='gsc_a_c')
                citations = cite_elem.get_text(strip=True) if cite_elem else '0'
                
                # Try to extract arXiv ID from title or journal
                arxiv_id = ''
                arxiv_match = re.search(r'arxiv[:\s]*(\d{4}\.\d{4,5})', title + ' ' + journal, re.IGNORECASE)
                if arxiv_match:
                    arxiv_id = arxiv_match.group(1)
                
                publication = {
                    'title': title,
                    'authors': authors,
                    'journal': journal,
                    'year': year,
                    'citations': citations,
                    'url': pub_url,
                    'arxiv_id': arxiv_id if arxiv_id else None
                }
                
                publications.append(publication)
                
            except Exception as e:
                print(f"Error parsing publication entry: {e}", file=sys.stderr)
                continue
        
        return publications
        
    except requests.RequestException as e:
        print(f"Error fetching from Google Scholar: {e}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"Error parsing Google Scholar page: {e}", file=sys.stderr)
        return None

def load_existing_publications():
    """Load existing publications.json if it exists"""
    try:
        with open('publications.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_publications(publications):
    """Save publications to JSON file"""
    with open('publications.json', 'w', encoding='utf-8') as f:
        json.dump(publications, f, indent=2, ensure_ascii=False)

def main():
    print("Fetching publications from Google Scholar...")
    
    # Try to fetch from Google Scholar
    publications = fetch_scholar_publications()
    
    if publications is None or len(publications) == 0:
        print("Warning: Could not fetch publications from Google Scholar.")
        print("This might be due to rate limiting or changes in Google Scholar's HTML structure.")
        print("Using existing publications.json if available, or creating a sample file.")
        
        # Try to load existing
        existing = load_existing_publications()
        if existing:
            print(f"Using {len(existing)} existing publications.")
            return
        else:
            # Create sample file with instructions
            sample_publications = [
                {
                    "title": "Sample Publication Title",
                    "authors": "D Morelli, A Author, B Author",
                    "journal": "Conference/Journal Name, 2024",
                    "year": "2024",
                    "citations": "0",
                    "url": f"https://scholar.google.com/citations?user={SCHOLAR_USER_ID}",
                    "arxiv_id": None
                }
            ]
            save_publications(sample_publications)
            print("Created sample publications.json. Please update it manually or fix the scraper.")
            return
    
    print(f"Successfully fetched {len(publications)} publications.")
    save_publications(publications)
    print("Publications saved to publications.json")

if __name__ == '__main__':
    main()

