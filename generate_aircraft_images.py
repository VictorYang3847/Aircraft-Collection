# -*- coding: utf-8 -*-
"""Generate all 36 aircraft images using text-to-image API"""
import os, time, urllib.request, urllib.parse

OUTPUT_DIR = r"c:\Users\Victor\Documents\Aircraft-Collection\public\images"
API_BASE = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image"

# All 12 aircraft with detailed descriptions for image generation
AIRCRAFT = [
    ("j-36", "Chengdu J-36 Chinese sixth generation stealth fighter jet, tailless flying wing design, dark gray camouflage paint, modern military aircraft"),
    ("j-50", "Shenyang J-50 Chinese sixth generation stealth fighter jet, twin engine, advanced angular aerodynamic design, dark gray military paint"),
    ("harrier", "BAe Harrier vertical takeoff fighter jet, British military aircraft, four exhaust nozzles, large air intakes, gray paint"),
    ("mirage-f1", "Dassault Mirage F1 French fighter jet, high-mounted swept wings, slender fuselage, gray military paint, single engine"),
    ("mirage-2000", "Dassault Mirage 2000 French fighter jet, delta wing no tailplane, sleek design, gray military paint, single vertical stabilizer"),
    ("mig-29", "Mikoyan MiG-29 Fulcrum Russian fighter jet, twin engines, large leading edge extensions, twin vertical stabilizers, gray paint"),
    ("f-15e", "F-15E Strike Eagle American two-seat fighter bomber, twin vertical stabilizers, conformal fuel tanks, gray military paint"),
    ("su-30", "Sukhoi Su-30 Russian two-seat multirole fighter, twin engines, large airframe, twin vertical stabilizers, gray military paint"),
    ("jf-17", "JF-17 Thunder FC-1 Xiaolong light multirole fighter, single engine, delta wing with canards, single vertical stabilizer, gray paint"),
    ("su-35", "Sukhoi Su-35 Flanker-E Russian super-maneuverable fighter, twin thrust-vectoring engines, large airframe, gray military paint"),
    ("tornado", "Panavia Tornado variable-sweep wing combat aircraft, swing-wing design, side-by-side twin engines, gray military paint"),
    ("su-34", "Sukhoi Su-34 Fullback Russian strike fighter, side-by-side two-seat cockpit, platypus-like flattened nose, twin engines, gray paint"),
]

VIEW_PROMPTS = {
    "front": "front view head-on facing camera directly, symmetrical aircraft nose forward, clear blue sky background",
    "side": "side profile view left side lateral view, full aircraft length visible, clear blue sky background",
    "top": "top down aerial view from above bird eye view, wings spread visible, clear blue sky background",
}


def generate_image(prompt_text, save_path):
    """Download image from text-to-image API"""
    encoded = urllib.parse.quote(prompt_text)
    url = f"{API_BASE}?prompt={encoded}&image_size=landscape_16_9"

    for attempt in range(1, 4):
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=120) as response:
                data = response.read()
                if len(data) > 5000:
                    with open(save_path, "wb") as f:
                        f.write(data)
                    return True, len(data)
                else:
                    print(f"  [WARN] Response too small: {len(data)} bytes")
        except Exception as e:
            print(f"  [WARN] Attempt {attempt} failed: {e}")
            time.sleep(3)
    return False, 0


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success = 0
    failed = 0
    total = 0

    for code, desc in AIRCRAFT:
        for view, view_desc in VIEW_PROMPTS.items():
            total += 1
            filename = f"{code}-{view}.jpg"
            filepath = os.path.join(OUTPUT_DIR, filename)

            prompt = f"Photorealistic military aircraft photograph: {desc}. {view_desc}. Professional aviation photography, realistic lighting, detailed aircraft surface, photorealistic"

            print(f"[{total}/36] {filename} ...", flush=True)
            ok, size = generate_image(prompt, filepath)
            if ok:
                success += 1
                print(f"  [OK] {size:,} bytes")
            else:
                failed += 1
                print(f"  [FAIL]")
            time.sleep(2)

    print(f"\nDone - Success: {success} / Failed: {failed}")


if __name__ == "__main__":
    main()
