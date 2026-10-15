#!/usr/bin/env python3
"""Offline, no-dependency smoke checks for the static deployment."""
from pathlib import Path
from html.parser import HTMLParser
import json

ROOT = Path(__file__).resolve().parent.parent
class Scanner(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=set();self.refs=[];self.count=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'):self.ids.add(a['id'])
        if tag=='article' and 'project-card' in a.get('class',''):self.count+=1
        for k in ['src','href']:
            v=a.get(k,'')
            if v.startswith('assets/'):self.refs.append(v)
scanner=Scanner();scanner.feed((ROOT/'index.html').read_text(encoding='utf-8'))
for item in ['home','about','work','experience','skills','contact','main-nav','theme-toggle','menu-toggle','copy-email']:
    assert item in scanner.ids, f'Missing required ID: {item}'
for asset in set(scanner.refs):
    assert (ROOT/asset).is_file(), f'Missing asset: {asset}'
content=json.loads((ROOT/'content.json').read_text(encoding='utf-8'))
assert scanner.count==len(content['featuredProjects'])==6, f'Wrong project count: {scanner.count}'
for p in content['featuredProjects']:
    if p['url']:
        assert p['url'].startswith('https://github.com/MaidaAdeelKhan/'), f'Unexpected repository URL {p["url"]}'
assert (ROOT/'assets/Maida-Khan-Resume.pdf').stat().st_size>10000
print('PASS: All required sections, project cards, repository URLs and local assets are present.')
