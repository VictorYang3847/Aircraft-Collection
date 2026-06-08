# -*- coding: utf-8 -*-
"""Download images for 12 new aircraft models"""
import os, json, time, requests, re, html
from pathlib import Path

OUTPUT_DIR = r"c:\Users\Victor\Documents\Aircraft-Collection\public\images"
MIN_FILE_SIZE = 5_000

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}
IMG_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36",
    "Referer": "https://www.bing.com/",
    "Accept": "image/*,*/*;q=0.8",
}

BAD_KEYWORDS = ["lego", "toy", "model", "drawing", "blueprint", "silhouette", "papercraft", "3d render", "miniature", "infographic", "乐高", "玩具", "模型", "线图", "插图", "漫画"]

NEW_AIRCRAFT = {
    "j-36": {"name": "Chengdu J-36 stealth fighter", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "j-50": {"name": "Shenyang J-50 stealth fighter", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "harrier": {"name": "BAe Harrier jump jet", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "mirage-f1": {"name": "Dassault Mirage F1", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "mirage-2000": {"name": "Dassault Mirage 2000", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "mig-29": {"name": "Mikoyan MiG-29 Fulcrum", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "f-15e": {"name": "McDonnell Douglas F-15E Strike Eagle", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "su-30": {"name": "Sukhoi Su-30 Flanker-C", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "jf-17": {"name": "JF-17 Thunder FC-1 Xiaolong", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "su-35": {"name": "Sukhoi Su-35 Flanker-E", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "tornado": {"name": "Panavia Tornado IDS", "views": {"front": "front view", "side": "side view", "top": "top view"}},
    "su-34": {"name": "Sukhoi Su-34 Fullback", "views": {"front": "front view", "side": "side view", "top": "top view"}},
}

def search_bing(query, limit=8):
    url = f"https://cn.bing.com/images/search?q={requests.utils.quote(query)}&form=HDRSC2"
    try:
        r = requests.get(url, headers=DEFAULT_HEADERS, timeout=30)
        if r.status_code != 200:
            return []
        matches = re.findall(r'class\s*=\s*["\']iusc["\'][^>]*?m\s*=\s*["\']([^"\']{50,}?)["\']', r.text)
        results = []
        for blob in matches[:limit * 3]:
            try:
                data = json.loads(html.unescape(blob))
                if "murl" not in data:
                    continue
                results.append({"turl": data.get("turl", ""), "murl": data["murl"], "title": data.get("t", "").lower()})
            except:
                continue
        cleaned = []
        for item in results:
            if any(kw in item["title"] for kw in BAD_KEYWORDS):
                continue
            cleaned.append(item)
            if len(cleaned) >= limit:
                break
        return cleaned
    except:
        return []

def download_image(turl, murl, save_path):
    for label, url in [("turl", turl), ("murl", murl)]:
        if not url:
            continue
        for attempt in range(1, 4):
            try:
                r = requests.get(url, headers=IMG_HEADERS, timeout=45)
                if r.status_code == 200 and len(r.content) >= MIN_FILE_SIZE:
                    with open(save_path, "wb") as f:
                        f.write(r.content)
                    return True, len(r.content)
            except:
                pass
            time.sleep(2 + attempt * 2)
    return False, 0

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success = 0
    failed = 0
    
    for code, info in NEW_AIRCRAFT.items():
        for view, suffix in info["views"].items():
            filename = f"{code}-{view}.jpg"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            # Always overwrite - placeholder images need to be replaced
            if False and os.path.exists(filepath) and os.path.getsize(filepath) > MIN_FILE_SIZE:
                print(f"[SKIP] {filename}")
                success += 1
                continue
            
            query = f"{info['name']} {suffix}"
            print(f"[搜] {filename} — '{query}'", flush=True)
            
            results = search_bing(query, limit=8)
            if not results:
                print(f"  [FAIL] 无搜索结果")
                failed += 1
                time.sleep(1.5)
                continue
            
            ok = False
            for item in results[:10]:
                ok, size = download_image(item["turl"], item["murl"], filepath)
                if ok:
                    print(f"  [OK] {size:,} bytes")
                    success += 1
                    ok = True
                    break
                time.sleep(1)
            
            if not ok:
                print(f"  [FAIL] 无法下载")
                failed += 1
            
            time.sleep(2)
    
    print(f"\n完成 — 成功 {success} / 失败 {failed}")

if __name__ == "__main__":
    main()
