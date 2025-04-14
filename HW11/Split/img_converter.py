from PIL import Image
import numpy as np
import os

dir = "HW11/Split/textures"

# Tranform all images in src/*.png to arrays and save them in txt/*.txt
for file in os.listdir(f"{dir}/src"):
    if file.endswith(".png"):
        src_path = f"{dir}/src/{file}"
        img = Image.open(src_path).convert("RGBA")
        pixels = np.array(img)  # shape: (height, width, 4). values are [r, g, b, a]

        # save as json for javascript to use
        txt_path = f"{dir}/txt/{file[:-(len('.png'))]}.txt"

        # Convert the 3D array to a 1D array where every 4 values are r, g, b, a
        oned_array = pixels.flatten()
        print(oned_array)

        # Save as txt
        with open(txt_path, "w") as f:
            f.write(f"{oned_array.tolist()}")

        print(f"Converted image {src_path} to array {txt_path}")