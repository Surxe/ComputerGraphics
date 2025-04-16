class Ground extends Actor {
    constructor() {
        const ground_radius = 100; // Cube w/ radius n will have area (2n)^2 not pi*r^2

        const texture_data = 
        [138, 185, 89, 255, 138, 185, 89, 255, 108, 171, 66, 255, 106, 171, 66, 255, 135, 182, 86, 255, 135, 182, 86, 255, 147, 194, 98, 255, 147, 194, 98, 255, 105, 166, 61, 255, 105, 166, 62, 255, 119, 180, 76, 255, 119, 180, 76, 255, 119, 180, 76, 255, 119, 180, 76, 255, 96, 157, 53, 255, 96, 157, 53, 255, 117, 178, 74, 255, 117, 178, 74, 255, 118, 179, 75, 255, 119, 179, 73, 255, 149, 196, 100, 255, 149, 196, 100, 255, 157, 204, 108, 255, 157, 204, 108, 255, 91, 154, 50, 255, 93, 154, 50, 255, 107, 168, 64, 255, 107, 168, 63, 255, 139, 186, 90, 255, 139, 186, 90, 255, 141, 188, 92, 255, 141, 188, 92, 255, 138, 185, 89, 255, 138, 185, 89, 255, 108, 171, 66, 255, 106, 171, 66, 255, 135, 182, 86, 255, 135, 182, 86, 255, 147, 194, 98, 255, 147, 194, 98, 255, 105, 166, 61, 255, 105, 166, 62, 255, 119, 180, 76, 255, 119, 180, 76, 255, 119, 180, 76, 255, 119, 180, 76, 255, 96, 157, 53, 255, 96, 157, 53, 255, 117, 178, 74, 255, 117, 178, 74, 255, 118, 179, 75, 255, 119, 179, 73, 255, 149, 196, 100, 255, 149, 196, 100, 255, 157, 204, 108, 255, 157, 204, 108, 255, 91, 154, 50, 255, 93, 154, 50, 255, 107, 168, 64, 255, 107, 168, 63, 255, 139, 186, 90, 255, 139, 186, 90, 255, 141, 188, 92, 255, 141, 188, 92, 255, 152, 199, 103, 255, 152, 199, 103, 255, 147, 192, 97, 255, 145, 192, 97, 255, 104, 167, 63, 255, 104, 167, 63, 255, 128, 191, 87, 255, 128, 191, 87, 255, 125, 186, 82, 255, 125, 186, 82, 255, 146, 192, 97, 255, 146, 193, 97, 255, 176, 223, 127, 255, 176, 223, 127, 255, 139, 186, 90, 255, 139, 186, 90, 255, 173, 220, 124, 255, 173, 220, 124, 255, 99, 160, 56, 255, 99, 160, 56, 255, 95, 158, 54, 255, 95, 159, 54, 255, 93, 156, 51, 255, 93, 156, 51, 255, 84, 148, 43, 255, 86, 147, 43, 255, 88, 149, 45, 255, 88, 149, 44, 255, 145, 192, 96, 255, 145, 192, 96, 255, 161, 208, 112, 255, 161, 208, 112, 255, 152, 199, 103, 255, 152, 199, 103, 255, 146, 193, 97, 255, 145, 192, 97, 255, 106, 167, 63, 255, 106, 167, 63, 255, 130, 191, 87, 255, 130, 191, 87, 255, 125, 186, 82, 255, 125, 186, 82, 255, 146, 192, 97, 255, 146, 193, 97, 255, 176, 223, 127, 255, 176, 223, 127, 255, 139, 186, 90, 255, 139, 186, 90, 255, 173, 220, 124, 255, 173, 220, 124, 255, 99, 160, 56, 255, 99, 160, 56, 255, 98, 159, 55, 255, 98, 159, 55, 255, 95, 156, 52, 255, 95, 156, 52, 255, 87, 148, 44, 255, 87, 148, 44, 255, 88, 149, 45, 255, 88, 149, 44, 255, 146, 193, 97, 255, 146, 193, 97, 255, 161, 208, 112, 255, 161, 208, 112, 255, 99, 164, 59, 255, 99, 164, 59, 255, 87, 151, 47, 255, 87, 152, 47, 255, 142, 189, 94, 255, 142, 189, 94, 255, 135, 182, 87, 255, 135, 182, 87, 255, 94, 156, 51, 255, 95, 156, 52, 255, 105, 169, 64, 255, 105, 169, 64, 255, 111, 175, 71, 255, 111, 175, 71, 255, 70, 133, 29, 255, 69, 133, 29, 255, 89, 153, 49, 255, 89, 153, 49, 255, 103, 164, 60, 255, 103, 164, 60, 255, 115, 176, 72, 255, 115, 176, 72, 255, 123, 184, 80, 255, 123, 184, 80, 255, 108, 169, 65, 255, 108, 169, 65, 255, 99, 160, 56, 255, 99, 160, 56, 255, 118, 182, 77, 255, 118, 181, 77, 255, 162, 210, 115, 255, 163, 210, 114, 255, 103, 164, 60, 255, 103, 164, 60, 255, 91, 152, 48, 255, 88, 153, 48, 255, 143, 190, 94, 255, 143, 190, 94, 255, 137, 184, 88, 255, 137, 184, 88, 255, 95, 156, 51, 255, 95, 156, 52, 255, 108, 169, 65, 255, 108, 169, 65, 255, 115, 176, 72, 255, 115, 176, 72, 255, 72, 133, 29, 255, 72, 133, 29, 255, 92, 153, 49, 255, 92, 153, 49, 255, 103, 164, 60, 255, 103, 164, 60, 255, 115, 176, 72, 255, 115, 176, 72, 255, 123, 184, 80, 255, 123, 184, 80, 255, 108, 169, 65, 255, 108, 169, 65, 255, 99, 160, 56, 255, 99, 160, 56, 255, 121, 182, 78, 255, 121, 182, 78, 255, 163, 211, 116, 255, 164, 211, 115, 255, 106, 167, 63, 255, 106, 167, 63, 255, 93, 154, 50, 255, 91, 155, 50, 255, 104, 164, 61, 255, 104, 165, 61, 255, 103, 164, 59, 255, 103, 163, 59, 255, 93, 154, 49, 255, 93, 154, 50, 255, 109, 170, 66, 255, 109, 170, 66, 255, 115, 176, 72, 255, 115, 176, 72, 255, 110, 171, 67, 255, 110, 171, 67, 255, 103, 164, 60, 255, 103, 164, 60, 255, 112, 173, 69, 255, 112, 173, 69, 255, 104, 165, 61, 255, 104, 165, 61, 255, 121, 182, 78, 255, 121, 182, 78, 255, 132, 184, 83, 255, 132, 185, 83, 255, 102, 163, 59, 255, 101, 164, 59, 255, 142, 193, 95, 255, 142, 193, 96, 255, 111, 173, 70, 255, 113, 172, 69, 255, 108, 169, 65, 255, 108, 169, 65, 255, 95, 156, 52, 255, 95, 156, 52, 255, 97, 158, 54, 255, 97, 158, 54, 255, 97, 158, 54, 255, 97, 158, 54, 255, 93, 154, 50, 255, 93, 154, 50, 255, 110, 171, 67, 255, 110, 171, 67, 255, 116, 177, 73, 255, 116, 177, 73, 255, 121, 182, 78, 255, 121, 182, 78, 255, 107, 168, 64, 255, 107, 168, 64, 255, 116, 177, 73, 255, 116, 177, 73, 255, 102, 163, 59, 255, 102, 163, 59, 255, 121, 182, 78, 255, 121, 182, 78, 255, 140, 188, 92, 255, 140, 187, 92, 255, 104, 165, 61, 255, 104, 165, 60, 255, 151, 197, 102, 255, 151, 198, 102, 255, 100, 163, 57, 255, 102, 163, 59, 255, 108, 169, 65, 255, 108, 169, 65, 255, 95, 156, 52, 255, 95, 156, 52, 255, 97, 158, 54, 255, 97, 158, 54, 255, 98, 159, 55, 255, 98, 159, 55, 255, 93, 154, 50, 255, 93, 154, 50, 255, 112, 173, 69, 255, 112, 173, 69, 255, 112, 173, 69, 255, 111, 173, 68, 255, 127, 187, 83, 255, 127, 187, 83, 255, 107, 169, 65, 255, 109, 168, 65, 255, 114, 175, 71, 255, 116, 174, 71, 255, 108, 169, 66, 255, 108, 169, 66, 255, 117, 179, 74, 255, 118, 179, 75, 255, 140, 188, 92, 255, 140, 187, 92, 255, 105, 166, 62, 255, 105, 166, 61, 255, 148, 195, 99, 255, 148, 195, 99, 255, 103, 165, 59, 255, 104, 165, 61, 255, 113, 174, 70, 255, 113, 174, 70, 255, 104, 165, 61, 255, 104, 165, 61, 255, 106, 167, 63, 255, 106, 167, 63, 255, 113, 174, 70, 255, 113, 174, 70, 255, 101, 162, 58, 255, 101, 162, 58, 255, 137, 198, 94, 255, 137, 198, 94, 255, 91, 152, 48, 255, 90, 152, 48, 255, 170, 217, 121, 255, 170, 217, 121, 255, 125, 172, 76, 255, 125, 172, 76, 255, 112, 173, 69, 255, 113, 173, 67, 255, 160, 207, 111, 255, 160, 207, 111, 255, 98, 161, 55, 255, 100, 161, 57, 255, 142, 190, 94, 255, 142, 189, 94, 255, 121, 182, 78, 255, 121, 182, 77, 255, 136, 183, 87, 255, 136, 183, 87, 255, 123, 186, 80, 255, 125, 186, 82, 255, 113, 174, 70, 255, 113, 174, 70, 255, 104, 165, 61, 255, 104, 165, 61, 255, 105, 166, 62, 255, 105, 166, 62, 255, 113, 174, 70, 255, 113, 174, 70, 255, 100, 161, 57, 255, 100, 161, 57, 255, 136, 197, 93, 255, 136, 197, 93, 255, 91, 152, 48, 255, 90, 152, 48, 255, 170, 217, 121, 255, 170, 217, 121, 255, 126, 172, 76, 255, 124, 173, 76, 255, 112, 173, 69, 255, 113, 173, 67, 255, 160, 207, 111, 255, 160, 207, 111, 255, 98, 161, 55, 255, 100, 161, 57, 255, 142, 189, 94, 255, 142, 188, 94, 255, 120, 181, 77, 255, 120, 181, 76, 255, 136, 182, 86, 255, 136, 182, 86, 255, 123, 186, 80, 255, 125, 186, 82, 255, 99, 160, 56, 255, 99, 160, 56, 255, 113, 174, 70, 255, 110, 175, 70, 255, 157, 204, 108, 255, 157, 204, 108, 255, 111, 173, 69, 255, 112, 173, 69, 255, 139, 200, 96, 255, 139, 200, 96, 255, 116, 177, 73, 255, 116, 177, 73, 255, 115, 176, 72, 255, 115, 176, 72, 255, 105, 166, 62, 255, 105, 166, 62, 255, 98, 159, 55, 255, 98, 159, 55, 255, 148, 195, 99, 255, 148, 195, 99, 255, 130, 177, 81, 255, 130, 177, 81, 255, 108, 171, 65, 255, 110, 171, 67, 255, 111, 172, 68, 255, 109, 172, 68, 255, 161, 208, 112, 255, 161, 208, 112, 255, 99, 161, 57, 255, 100, 161, 57, 255, 121, 182, 78, 255, 121, 182, 78, 255, 99, 160, 56, 255, 99, 160, 56, 255, 113, 174, 70, 255, 110, 175, 70, 255, 157, 204, 108, 255, 157, 204, 108, 255, 111, 173, 69, 255, 112, 173, 69, 255, 139, 200, 96, 255, 139, 200, 96, 255, 116, 177, 73, 255, 113, 178, 73, 255, 112, 178, 70, 255, 112, 178, 70, 255, 102, 168, 60, 255, 102, 168, 60, 255, 95, 161, 53, 255, 95, 161, 53, 255, 148, 195, 99, 255, 148, 195, 99, 255, 131, 175, 83, 255, 131, 175, 83, 255, 107, 172, 65, 255, 107, 173, 65, 255, 109, 173, 66, 255, 109, 173, 68, 255, 161, 208, 112, 255, 161, 207, 112, 255, 97, 163, 55, 255, 97, 163, 55, 255, 120, 182, 78, 255, 121, 182, 78, 255, 96, 157, 53, 255, 96, 157, 53, 255, 96, 157, 53, 255, 93, 158, 53, 255, 125, 172, 76, 255, 125, 172, 76, 255, 102, 164, 60, 255, 103, 164, 60, 255, 116, 177, 73, 255, 116, 177, 73, 255, 100, 161, 57, 255, 100, 160, 57, 255, 148, 195, 99, 255, 148, 195, 99, 255, 157, 204, 108, 255, 157, 204, 108, 255, 134, 181, 85, 255, 134, 181, 85, 255, 151, 198, 102, 255, 150, 198, 102, 255, 99, 160, 56, 255, 99, 160, 56, 255, 150, 195, 101, 255, 150, 197, 101, 255, 148, 195, 99, 255, 148, 195, 99, 255, 160, 207, 111, 255, 160, 207, 111, 255, 133, 180, 84, 255, 133, 180, 84, 255, 97, 160, 54, 255, 99, 160, 56, 255, 96, 157, 53, 255, 96, 157, 53, 255, 96, 157, 53, 255, 93, 158, 53, 255, 125, 172, 76, 255, 125, 172, 76, 255, 102, 164, 60, 255, 103, 164, 60, 255, 116, 177, 73, 255, 116, 177, 73, 255, 100, 161, 57, 255, 100, 160, 57, 255, 148, 195, 99, 255, 148, 195, 99, 255, 157, 204, 108, 255, 157, 204, 108, 255, 134, 181, 85, 255, 134, 181, 85, 255, 151, 198, 102, 255, 150, 198, 102, 255, 99, 160, 56, 255, 99, 160, 56, 255, 150, 195, 101, 255, 150, 197, 101, 255, 148, 195, 99, 255, 148, 195, 99, 255, 160, 207, 111, 255, 160, 207, 111, 255, 133, 180, 84, 255, 133, 180, 84, 255, 97, 160, 54, 255, 99, 160, 56, 255, 146, 193, 99, 255, 146, 193, 99, 255, 97, 157, 54, 255, 94, 159, 54, 255, 138, 185, 89, 255, 138, 185, 89, 255, 112, 174, 70, 255, 113, 174, 70, 255, 99, 160, 56, 255, 99, 160, 56, 255, 105, 166, 62, 255, 105, 165, 62, 255, 151, 198, 102, 255, 151, 198, 102, 255, 119, 183, 76, 255, 119, 183, 76, 255, 100, 164, 57, 255, 100, 164, 57, 255, 132, 196, 89, 255, 131, 196, 89, 255, 94, 155, 51, 255, 94, 155, 51, 255, 111, 176, 69, 255, 112, 176, 69, 255, 107, 171, 64, 255, 104, 172, 66, 255, 135, 182, 86, 255, 135, 181, 86, 255, 103, 167, 60, 255, 103, 167, 60, 255, 110, 174, 70, 255, 113, 174, 70, 255, 147, 194, 98, 255, 147, 194, 98, 255, 96, 159, 54, 255, 94, 159, 54, 255, 138, 185, 89, 255, 138, 185, 89, 255, 112, 174, 70, 255, 113, 174, 70, 255, 97, 160, 54, 255, 98, 160, 54, 255, 104, 166, 60, 255, 101, 167, 62, 255, 150, 198, 103, 255, 150, 198, 103, 255, 120, 182, 77, 255, 121, 182, 78, 255, 102, 163, 59, 255, 102, 163, 59, 255, 134, 195, 91, 255, 134, 195, 91, 255, 94, 155, 51, 255, 94, 155, 51, 255, 114, 175, 71, 255, 114, 175, 71, 255, 109, 170, 66, 255, 107, 170, 66, 255, 135, 182, 86, 255, 135, 181, 86, 255, 103, 166, 60, 255, 104, 166, 60, 255, 113, 173, 70, 255, 113, 174, 70, 255, 121, 168, 72, 255, 121, 168, 72, 255, 120, 183, 78, 255, 118, 183, 78, 255, 145, 192, 96, 255, 145, 192, 96, 255, 114, 176, 72, 255, 115, 176, 72, 255, 150, 197, 101, 255, 150, 197, 101, 255, 159, 206, 110, 255, 159, 205, 110, 255, 105, 166, 62, 255, 105, 166, 62, 255, 102, 163, 59, 255, 102, 163, 59, 255, 97, 158, 54, 255, 97, 158, 54, 255, 108, 169, 65, 255, 108, 169, 65, 255, 101, 162, 58, 255, 101, 162, 58, 255, 116, 177, 73, 255, 116, 177, 73, 255, 114, 175, 71, 255, 112, 175, 71, 255, 143, 190, 94, 255, 143, 190, 94, 255, 134, 181, 85, 255, 134, 181, 85, 255, 94, 157, 51, 255, 96, 157, 53, 255, 121, 168, 72, 255, 121, 168, 72, 255, 120, 183, 78, 255, 118, 183, 78, 255, 145, 192, 96, 255, 145, 192, 96, 255, 114, 176, 72, 255, 115, 176, 72, 255, 150, 197, 101, 255, 150, 197, 101, 255, 159, 206, 110, 255, 159, 205, 110, 255, 105, 166, 62, 255, 105, 166, 62, 255, 102, 163, 59, 255, 102, 163, 59, 255, 97, 158, 54, 255, 97, 158, 54, 255, 108, 169, 65, 255, 108, 169, 65, 255, 101, 162, 58, 255, 101, 162, 58, 255, 116, 177, 73, 255, 116, 177, 73, 255, 114, 175, 71, 255, 112, 175, 71, 255, 143, 190, 94, 255, 143, 190, 94, 255, 134, 181, 85, 255, 134, 181, 85, 255, 94, 157, 51, 255, 96, 157, 53, 255, 116, 179, 73, 255, 116, 179, 73, 255, 110, 174, 69, 255, 112, 173, 69, 255, 103, 168, 61, 255, 103, 167, 61, 255, 89, 150, 46, 255, 89, 150, 46, 255, 97, 162, 56, 255, 98, 162, 56, 255, 103, 167, 61, 255, 104, 166, 61, 255, 119, 180, 76, 255, 119, 180, 76, 255, 105, 166, 62, 255, 105, 166, 62, 255, 131, 180, 83, 255, 132, 179, 85, 255, 119, 180, 76, 255, 119, 180, 76, 255, 120, 181, 77, 255, 120, 181, 77, 255, 98, 159, 55, 255, 98, 159, 55, 255, 142, 191, 94, 255, 143, 190, 96, 255, 87, 151, 45, 255, 87, 151, 45, 255, 119, 183, 77, 255, 119, 183, 77, 255, 122, 184, 80, 255, 123, 184, 80, 255, 118, 179, 75, 255, 118, 179, 75, 255, 112, 173, 69, 255, 112, 173, 69, 255, 106, 167, 63, 255, 106, 167, 63, 255, 90, 151, 47, 255, 90, 151, 47, 255, 101, 162, 58, 255, 101, 162, 58, 255, 106, 167, 63, 255, 106, 167, 63, 255, 119, 180, 76, 255, 119, 180, 76, 255, 105, 166, 62, 255, 105, 166, 62, 255, 132, 180, 85, 255, 133, 180, 84, 255, 119, 180, 76, 255, 119, 180, 76, 255, 120, 181, 77, 255, 120, 181, 77, 255, 99, 160, 56, 255, 99, 160, 56, 255, 143, 191, 95, 255, 143, 190, 95, 255, 90, 151, 47, 255, 90, 151, 47, 255, 122, 183, 79, 255, 122, 183, 79, 255, 123, 184, 80, 255, 123, 184, 80, 255, 111, 172, 68, 255, 111, 172, 68, 255, 106, 167, 63, 255, 106, 167, 63, 255, 95, 156, 52, 255, 95, 156, 51, 255, 145, 192, 96, 255, 145, 192, 96, 255, 142, 189, 94, 255, 142, 189, 94, 255, 94, 160, 54, 255, 97, 158, 54, 255, 88, 149, 45, 255, 87, 149, 45, 255, 160, 207, 111, 255, 160, 207, 111, 255, 149, 196, 100, 255, 149, 196, 100, 255, 114, 161, 65, 255, 114, 161, 65, 255, 150, 197, 101, 255, 150, 198, 101, 255, 147, 194, 98, 255, 147, 194, 98, 255, 102, 162, 59, 255, 101, 163, 59, 255, 147, 193, 98, 255, 147, 193, 98, 255, 101, 162, 58, 255, 101, 162, 58, 255, 130, 191, 87, 255, 130, 191, 87, 255, 111, 172, 68, 255, 111, 172, 68, 255, 106, 167, 63, 255, 106, 167, 63, 255, 96, 157, 53, 255, 96, 157, 52, 255, 149, 196, 100, 255, 149, 196, 100, 255, 145, 192, 96, 255, 145, 192, 96, 255, 95, 160, 55, 255, 98, 159, 55, 255, 87, 148, 44, 255, 86, 148, 44, 255, 164, 211, 115, 255, 164, 211, 115, 255, 150, 197, 101, 255, 150, 197, 101, 255, 114, 161, 65, 255, 114, 161, 65, 255, 152, 199, 103, 255, 152, 199, 103, 255, 150, 197, 101, 255, 150, 197, 101, 255, 99, 162, 58, 255, 99, 162, 58, 255, 151, 198, 102, 255, 151, 198, 102, 255, 100, 162, 58, 255, 101, 162, 58, 255, 132, 193, 89, 255, 132, 193, 89, 255, 102, 163, 59, 255, 102, 163, 59, 255, 108, 169, 65, 255, 108, 169, 65, 255, 101, 162, 58, 255, 101, 162, 58, 255, 128, 184, 82, 255, 128, 183, 82, 255, 130, 186, 85, 255, 130, 186, 85, 255, 103, 164, 60, 255, 103, 164, 60, 255, 93, 154, 50, 255, 93, 154, 50, 255, 127, 182, 81, 255, 126, 182, 81, 255, 118, 173, 72, 255, 118, 173, 72, 255, 102, 157, 57, 255, 102, 158, 57, 255, 134, 189, 88, 255, 134, 189, 88, 255, 129, 185, 84, 255, 129, 185, 84, 255, 109, 173, 68, 255, 108, 173, 68, 255, 126, 181, 80, 255, 125, 180, 80, 255, 101, 162, 58, 255, 101, 162, 58, 255, 107, 168, 64, 255, 107, 168, 64, 255, 95, 156, 52, 255, 95, 156, 52, 255, 112, 173, 69, 255, 112, 173, 69, 255, 109, 170, 66, 255, 109, 170, 66, 255, 113, 174, 70, 255, 113, 174, 70, 255, 121, 182, 78, 255, 121, 182, 78, 255, 111, 172, 68, 255, 111, 172, 68, 255, 101, 162, 58, 255, 101, 162, 58, 255, 97, 158, 54, 255, 97, 158, 54, 255, 93, 154, 50, 255, 93, 154, 50, 255, 95, 156, 52, 255, 95, 156, 52, 255, 123, 184, 80, 255, 123, 184, 80, 255, 115, 176, 72, 255, 115, 176, 72, 255, 121, 182, 78, 255, 121, 182, 78, 255, 108, 169, 65, 255, 108, 169, 65, 255, 103, 164, 60, 255, 103, 164, 60, 255, 88, 149, 45, 255, 88, 149, 45, 255, 95, 156, 52, 255, 95, 156, 52, 255, 110, 172, 68, 255, 111, 172, 68, 255, 108, 169, 65, 255, 108, 169, 65, 255, 112, 173, 69, 255, 112, 173, 69, 255, 120, 182, 79, 255, 120, 182, 78, 255, 110, 172, 68, 255, 110, 171, 69, 255, 101, 162, 58, 255, 101, 162, 58, 255, 97, 158, 54, 255, 97, 158, 54, 255, 93, 154, 50, 255, 93, 154, 50, 255, 95, 156, 52, 255, 95, 156, 52, 255, 123, 184, 80, 255, 123, 184, 80, 255, 114, 175, 71, 255, 114, 175, 71, 255, 119, 180, 76, 255, 117, 181, 76, 255, 109, 169, 66, 255, 108, 169, 66, 255, 103, 165, 60, 255, 103, 165, 60, 255, 89, 150, 46, 255, 89, 150, 46, 255, 160, 207, 111, 255, 160, 207, 111, 255, 97, 160, 55, 255, 98, 159, 55, 255, 89, 150, 46, 255, 89, 150, 46, 255, 105, 166, 62, 255, 105, 166, 62, 255, 150, 198, 102, 255, 151, 198, 102, 255, 146, 193, 97, 255, 146, 192, 97, 255, 129, 190, 86, 255, 129, 190, 86, 255, 118, 179, 75, 255, 118, 179, 75, 255, 114, 175, 71, 255, 114, 175, 71, 255, 114, 175, 71, 255, 114, 175, 71, 255, 106, 167, 63, 255, 106, 167, 63, 255, 107, 168, 64, 255, 107, 168, 64, 255, 102, 163, 59, 255, 100, 163, 59, 255, 156, 203, 107, 255, 156, 203, 107, 255, 163, 210, 114, 255, 163, 210, 114, 255, 141, 188, 92, 255, 141, 188, 92, 255, 159, 206, 110, 255, 160, 206, 110, 255, 98, 158, 55, 255, 98, 159, 55, 255, 88, 149, 45, 255, 88, 149, 45, 255, 104, 165, 61, 255, 105, 166, 62, 255, 151, 197, 101, 255, 151, 197, 100, 255, 146, 193, 97, 255, 145, 193, 97, 255, 126, 190, 86, 255, 126, 190, 86, 255, 118, 179, 75, 255, 118, 179, 75, 255, 114, 175, 71, 255, 114, 175, 71, 255, 114, 175, 71, 255, 114, 175, 71, 255, 106, 167, 63, 255, 106, 167, 63, 255, 104, 169, 64, 255, 104, 169, 64, 255, 99, 163, 59, 255, 98, 163, 59, 255, 156, 203, 107, 255, 156, 202, 107, 255, 162, 209, 114, 255, 162, 209, 114, 255, 141, 187, 92, 255, 141, 187, 92, 255, 109, 170, 66, 255, 109, 170, 66, 255, 105, 166, 62, 255, 105, 166, 62, 255, 110, 171, 67, 255, 110, 171, 67, 255, 99, 160, 56, 255, 99, 160, 56, 255, 117, 178, 74, 255, 117, 178, 74, 255, 144, 190, 95, 255, 144, 191, 95, 255, 147, 194, 98, 255, 147, 193, 98, 255, 96, 158, 54, 255, 97, 158, 54, 255, 100, 161, 57, 255, 100, 161, 57, 255, 106, 167, 63, 255, 106, 167, 63, 255, 98, 159, 55, 255, 98, 159, 55, 255, 131, 176, 82, 255, 131, 178, 82, 255, 129, 176, 80, 255, 129, 176, 80, 255, 138, 185, 89, 255, 138, 185, 89, 255, 109, 171, 67, 255, 110, 171, 67, 255, 119, 180, 76, 255, 119, 180, 76, 255, 109, 170, 66, 255, 109, 170, 66, 255, 105, 166, 62, 255, 105, 166, 62, 255, 110, 171, 67, 255, 110, 171, 67, 255, 99, 160, 56, 255, 99, 160, 56, 255, 117, 178, 74, 255, 117, 178, 74, 255, 142, 190, 95, 255, 144, 191, 95, 255, 147, 193, 98, 255, 147, 193, 97, 255, 95, 157, 53, 255, 96, 157, 53, 255, 99, 160, 56, 255, 99, 160, 56, 255, 106, 167, 63, 255, 106, 167, 63, 255, 98, 159, 55, 255, 98, 159, 55, 255, 131, 176, 81, 255, 131, 177, 82, 255, 129, 176, 80, 255, 129, 176, 80, 255, 138, 185, 89, 255, 138, 185, 88, 255, 109, 170, 66, 255, 109, 170, 66, 255, 119, 180, 76, 255, 119, 180, 76, 255, 111, 172, 68, 255, 111, 172, 68, 255, 82, 143, 39, 255, 82, 143, 39, 255, 99, 160, 56, 255, 99, 160, 56, 255, 107, 168, 64, 255, 107, 168, 64, 255, 105, 166, 62, 255, 105, 166, 62, 255, 108, 169, 65, 255, 108, 169, 65, 255, 120, 181, 77, 255, 120, 181, 77, 255, 128, 189, 85, 255, 128, 189, 85, 255, 110, 171, 67, 255, 110, 171, 67, 255, 97, 158, 54, 255, 97, 158, 54, 255, 113, 174, 70, 255, 113, 174, 70, 255, 103, 165, 61, 255, 104, 165, 61, 255, 104, 165, 61, 255, 104, 165, 61, 255, 117, 178, 74, 255, 116, 178, 74, 255, 120, 181, 77, 255, 120, 181, 77, 255, 118, 179, 75, 255, 118, 179, 75, 255, 111, 172, 68, 255, 111, 172, 68, 255, 82, 143, 39, 255, 82, 143, 39, 255, 99, 160, 56, 255, 99, 160, 56, 255, 107, 168, 64, 255, 107, 168, 64, 255, 105, 166, 62, 255, 105, 166, 62, 255, 108, 169, 65, 255, 108, 169, 65, 255, 120, 181, 77, 255, 120, 181, 77, 255, 128, 189, 85, 255, 128, 189, 85, 255, 110, 171, 67, 255, 110, 171, 67, 255, 97, 158, 54, 255, 97, 158, 54, 255, 113, 174, 70, 255, 113, 174, 70, 255, 104, 165, 61, 255, 104, 165, 61, 255, 104, 165, 61, 255, 104, 165, 61, 255, 117, 178, 74, 255, 117, 178, 74, 255, 120, 181, 77, 255, 120, 181, 77, 255, 118, 179, 75, 255, 118, 179, 75, 255]

        const width = 32;
        const height = 32;
        const tex_coords = [
            [0.0, 0.0], // bottom-left
            [1.0, 0.0], // bottom-right
            [1.0, 1.0], // top-right
            [0.0, 1.0], // top-left
        ];

        const ground_entity = new TexturedEntity(
            [
                -ground_radius, -1, -ground_radius, 
                -ground_radius, -1, ground_radius, 
                ground_radius , -1, ground_radius, 
                ground_radius , -1, -ground_radius
            ], // Vertices
            [
                0, 1, 2, // Triangle 1
                0, 2, 3  // Triangle 2
            ],
            tex_coords,
            texture_data, // Texture data
            width, // Texture width
            height
            )
        const ground_y_location = -ground_radius/2-1+.5 // //tbox is secretly a massive cube, shift its center down by half its height. Down 1 more so the camera isn't inside it. Shift up by half the camera height.

        const trigger_boxes = [new TriggerBox([0, ground_y_location, 0], [2*ground_radius, 2*ground_radius, 2*ground_radius])]

        super(
            ground_entity, // Entity
            trigger_boxes // Trigger boxes
        );
    }
}