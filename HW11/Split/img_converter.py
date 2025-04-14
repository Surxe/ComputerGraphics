from PIL import Image
import numpy as np
import json
import os

dir = "HW11/Split/textures"

# Tranform all images in src/*.png to arrays and save them in json/*.json
for file in os.listdir(f"{dir}/src"):
    if file.endswith(".png"):
        src_path = f"{dir}/src/{file}"
        img = Image.open(src_path).convert("RGB")
        pixels = np.array(img)  # shape: (height, width, 3). values are [r, g, b]

        # save as json for javascript to use
        json_path = f"{dir}/json/{file[:-(len('.png'))]}.json"
        with open(json_path, "w") as f:
            json.dump(pixels.tolist(), f)

        print(f"Converted image {src_path} to array {json_path}")